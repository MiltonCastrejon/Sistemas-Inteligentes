import numpy as np
import pandas as pd
import json
import sys
from sqlalchemy import create_engine
import io
from sklearn.linear_model import LinearRegression


dbconfig = {
    "server": "ALDAIR",
    "database": "ferrecast",
    "username": "Milton",
    "password": "280506",
    "driver": "ODBC Driver 18 for SQL Server",
}


def get_sales_data():
    try:

        connection_string = (
            f"mssql+pyodbc://{dbconfig['username']}:{dbconfig['password']}@{dbconfig['server']}/{dbconfig['database']}?"
            f"driver={dbconfig['driver']}&TrustServerCertificate=yes&Encrypt=yes"
        )
        engine = create_engine(connection_string)

        query = """
       WITH Top5Productos AS (
    SELECT TOP 5 p.nombre AS producto,
                 SUM(dv.cantidad) AS total_vendido
    FROM ventas v
             INNER JOIN detalleventas dv ON v.idventa = dv.idventa
             INNER JOIN producto p ON dv.idproducto = p.idproducto
    GROUP BY p.nombre
    ORDER BY SUM(dv.cantidad) DESC
)
SELECT DATEPART(WEEK, fecha) AS semana,
       tp.producto,
       COALESCE(SUM(ranked_products.cantidad_vendida), 0) AS cantidad_vendida
FROM (
         SELECT
             v.fechaventa AS fecha,
             p.nombre AS producto,
             SUM(dv.cantidad) AS cantidad_vendida,
             ROW_NUMBER() OVER(PARTITION BY DATEPART(WEEK, v.fechaventa) ORDER BY SUM(dv.cantidad) DESC) AS ranking
         FROM ventas v
                  INNER JOIN detalleventas dv ON v.idventa = dv.idventa
                  INNER JOIN producto p ON dv.idproducto = p.idproducto
         WHERE v.fechaventa >= DATEADD(WEEK, -4, GETDATE()) 
         GROUP BY v.fechaventa, p.nombre
     ) AS ranked_products
         RIGHT JOIN Top5Productos tp ON ranked_products.producto = tp.producto
WHERE ranking <= 5 OR tp.producto IS NOT NULL
GROUP BY DATEPART(WEEK, fecha), tp.producto
ORDER BY DATEPART(WEEK, fecha) DESC, cantidad_vendida DESC;
        """
        df = pd.read_sql(query, engine)
        return df.to_json(orient="records")
    except Exception as ex:
        error_message = str(ex)
        return json.dumps({"error": error_message})


def predict_sales(sales_data):

    df = pd.read_json(io.StringIO(sales_data))

    grouped = df.groupby("producto")["cantidad_vendida"].sum().reset_index()

    results = {}

    for product in grouped["producto"].unique():
        # Filtrar las ventas de este producto
        product_sales = df[df["producto"] == product]

        model = LinearRegression()

        X = product_sales["semana"].values.reshape(-1, 1)
        y = product_sales["cantidad_vendida"]
        model.fit(X, y)

        next_week = product_sales["semana"].max() + 1
        prediction = model.predict([[next_week]])

        prediction = max(0, prediction[0])

        for week in product_sales["semana"].unique():
            week_key = f"Semana {int(week)}"
            if week_key not in results:
                results[week_key] = {}
            results[week_key][product] = int(
                product_sales[product_sales["semana"] == week][
                    "cantidad_vendida"
                ].values[0]
            )

        next_week_key = f"Siguiente semana {int(next_week)}"
        if next_week_key not in results:
            results[next_week_key] = {}
        results[next_week_key][product] = round(prediction)

    sorted_results = dict(sorted(results.items(), key=lambda x: int(x[0].split()[-1])))

    return sorted_results


if __name__ == "__main__":

    sales_data = get_sales_data()

    predictions = predict_sales(sales_data)

    print(json.dumps(predictions))
