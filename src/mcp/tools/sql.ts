// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Tool } from '@modelcontextprotocol/sdk/types.js';

export class SqlTools {
  getTools(): Tool[] {
    return [
      {
        name: 'sql_list_tables',
        description: 'List all tables in the SQL Database',
        inputSchema: {
          type: 'object',
          properties: {
            connectionString: {
              type: 'string',
              description: 'SQL Server connection string'
            }
          },
          required: ['connectionString']
        }
      },
      {
        name: 'sql_describe_table',
        description: 'Get table schema and details including columns, types, and indexes',
        inputSchema: {
          type: 'object',
          properties: {
            connectionString: {
              type: 'string',
              description: 'SQL Server connection string'
            },
            tableName: {
              type: 'string',
              description: 'Name of the table to describe'
            }
          },
          required: ['connectionString', 'tableName']
        }
      },
      {
        name: 'sql_create_table',
        description: 'Create a new table in the SQL Database',
        inputSchema: {
          type: 'object',
          properties: {
            connectionString: {
              type: 'string',
              description: 'SQL Server connection string'
            },
            sql: {
              type: 'string',
              description: 'CREATE TABLE SQL statement'
            }
          },
          required: ['connectionString', 'sql']
        }
      },
      {
        name: 'sql_drop_table',
        description: 'Drop an existing table from the SQL Database',
        inputSchema: {
          type: 'object',
          properties: {
            connectionString: {
              type: 'string',
              description: 'SQL Server connection string'
            },
            tableName: {
              type: 'string',
              description: 'Name of the table to drop'
            }
          },
          required: ['connectionString', 'tableName']
        }
      },
      {
        name: 'sql_insert_data',
        description: 'Insert data into a table in the SQL Database',
        inputSchema: {
          type: 'object',
          properties: {
            connectionString: {
              type: 'string',
              description: 'SQL Server connection string'
            },
            sql: {
              type: 'string',
              description: 'INSERT SQL statement'
            }
          },
          required: ['connectionString', 'sql']
        }
      },
      {
        name: 'sql_read_data',
        description: 'Execute SQL queries to read data from the SQL Database',
        inputSchema: {
          type: 'object',
          properties: {
            connectionString: {
              type: 'string',
              description: 'SQL Server connection string'
            },
            sql: {
              type: 'string',
              description: 'SELECT SQL query to execute'
            }
          },
          required: ['connectionString', 'sql']
        }
      },
      {
        name: 'sql_update_data',
        description: 'Update data in a table in the SQL Database',
        inputSchema: {
          type: 'object',
          properties: {
            connectionString: {
              type: 'string',
              description: 'SQL Server connection string'
            },
            sql: {
              type: 'string',
              description: 'UPDATE SQL statement'
            }
          },
          required: ['connectionString', 'sql']
        }
      }
    ];
  }

  getHandlers(): Record<string, (args: any) => Promise<any>> {
    return {
      sql_list_tables: this.listTables.bind(this),
      sql_describe_table: this.describeTable.bind(this),
      sql_create_table: this.createTable.bind(this),
      sql_drop_table: this.dropTable.bind(this),
      sql_insert_data: this.insertData.bind(this),
      sql_read_data: this.readData.bind(this),
      sql_update_data: this.updateData.bind(this)
    };
  }

  private async listTables(args: any): Promise<any> {
    const { connectionString } = args;
    
    try {
      // For now, we'll use a simple approach with child_process to execute SQL queries
      // This mimics the .NET implementation pattern but in Node.js
      const query = `SELECT TABLE_SCHEMA, TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' ORDER BY TABLE_SCHEMA, TABLE_NAME`;
      
      const result = await this.executeQuery(connectionString, query);
      
      return {
        success: true,
        data: result.recordset ? result.recordset.map((row: any) => `${row.TABLE_SCHEMA}.${row.TABLE_NAME}`) : [],
        message: 'Tables retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  private async describeTable(args: any): Promise<any> {
    const { connectionString, tableName } = args;
    
    try {
      // Query for table metadata
      const tableInfoQuery = `
        SELECT t.object_id AS id, t.name, s.name AS [schema], p.value AS description, t.type, u.name AS owner
        FROM sys.tables t
        INNER JOIN sys.schemas s ON t.schema_id = s.schema_id
        LEFT JOIN sys.extended_properties p ON p.major_id = t.object_id AND p.minor_id = 0 AND p.name = 'MS_Description'
        LEFT JOIN sys.sysusers u ON t.principal_id = u.uid
        WHERE t.name = '${tableName}'`;

      // Query for columns
      const columnsQuery = `
        SELECT c.name, ty.name AS type, c.max_length AS length, c.precision, c.is_nullable AS nullable, p.value AS description
        FROM sys.columns c
        INNER JOIN sys.types ty ON c.user_type_id = ty.user_type_id
        LEFT JOIN sys.extended_properties p ON p.major_id = c.object_id AND p.minor_id = c.column_id AND p.name = 'MS_Description'
        WHERE c.object_id = (SELECT object_id FROM sys.tables WHERE name = '${tableName}')`;

      const [tableInfo, columns] = await Promise.all([
        this.executeQuery(connectionString, tableInfoQuery),
        this.executeQuery(connectionString, columnsQuery)
      ]);

      return {
        success: true,
        data: {
          table: tableInfo.recordset?.[0] || null,
          columns: columns.recordset || []
        },
        message: 'Table described successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  private async createTable(args: any): Promise<any> {
    const { connectionString, sql } = args;
    
    try {
      const result = await this.executeQuery(connectionString, sql);
      
      return {
        success: true,
        rowsAffected: result.rowsAffected?.[0] || 0,
        message: 'Table created successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  private async dropTable(args: any): Promise<any> {
    const { connectionString, tableName } = args;
    
    try {
      const sql = `DROP TABLE ${tableName}`;
      const result = await this.executeQuery(connectionString, sql);
      
      return {
        success: true,
        rowsAffected: result.rowsAffected?.[0] || 0,
        message: 'Table dropped successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  private async insertData(args: any): Promise<any> {
    const { connectionString, sql } = args;
    
    try {
      const result = await this.executeQuery(connectionString, sql);
      
      return {
        success: true,
        rowsAffected: result.rowsAffected?.[0] || 0,
        message: 'Data inserted successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  private async readData(args: any): Promise<any> {
    const { connectionString, sql } = args;
    
    try {
      const result = await this.executeQuery(connectionString, sql);
      
      return {
        success: true,
        data: result.recordset || [],
        message: 'Data retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  private async updateData(args: any): Promise<any> {
    const { connectionString, sql } = args;
    
    try {
      const result = await this.executeQuery(connectionString, sql);
      
      return {
        success: true,
        rowsAffected: result.rowsAffected?.[0] || 0,
        message: 'Data updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  private async executeQuery(connectionString: string, sql: string): Promise<any> {
    // For now, use a simple implementation that requires the mssql package
    // In a production environment, this would be properly configured
    try {
      const mssql = await import('mssql');
      const pool = new mssql.ConnectionPool(connectionString);
      await pool.connect();
      
      const request = pool.request();
      const result = await request.query(sql);
      
      await pool.close();
      return result;
    } catch (importError) {
      // Fallback if mssql package is not available
      throw new Error(`SQL Server functionality requires the 'mssql' package to be installed. Please run: npm install mssql\nOriginal error: ${importError instanceof Error ? importError.message : String(importError)}`);
    }
  }
}