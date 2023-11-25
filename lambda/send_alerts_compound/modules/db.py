import mysql.connector

def get_query_data(config, sql, sql_vars):
  conn = mysql.connector.connect(**config)
  cursor = conn.cursor()

  cursor.execute(sql, sql_vars)
  rows = cursor.fetchall()

  cursor.close()
  conn.close()

  return rows


def get_query_data_single(config, sql, sql_vars):
  conn = mysql.connector.connect(**config)
  cursor = conn.cursor()

  cursor.execute(sql, sql_vars)
  row = cursor.fetchone()

  cursor.close()
  conn.close()

  return row


def insert_query(config, sql, sql_vars):
  conn = mysql.connector.connect(**config)
  cursor = conn.cursor()

  cursor.execute(sql, sql_vars)
  conn.commit()

  cursor.close()
  conn.close()

  return True
