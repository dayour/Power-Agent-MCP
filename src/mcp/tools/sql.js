"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlTools = void 0;
var SqlTools = /** @class */ (function () {
    function SqlTools() {
    }
    SqlTools.prototype.getTools = function () {
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
    };
    SqlTools.prototype.getHandlers = function () {
        return {
            sql_list_tables: this.listTables.bind(this),
            sql_describe_table: this.describeTable.bind(this),
            sql_create_table: this.createTable.bind(this),
            sql_drop_table: this.dropTable.bind(this),
            sql_insert_data: this.insertData.bind(this),
            sql_read_data: this.readData.bind(this),
            sql_update_data: this.updateData.bind(this)
        };
    };
    SqlTools.prototype.listTables = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var connectionString, query, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        connectionString = args.connectionString;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        query = "SELECT TABLE_SCHEMA, TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' ORDER BY TABLE_SCHEMA, TABLE_NAME";
                        return [4 /*yield*/, this.executeQuery(connectionString, query)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, {
                                success: true,
                                data: result.recordset ? result.recordset.map(function (row) { return "".concat(row.TABLE_SCHEMA, ".").concat(row.TABLE_NAME); }) : [],
                                message: 'Tables retrieved successfully'
                            }];
                    case 3:
                        error_1 = _a.sent();
                        return [2 /*return*/, {
                                success: false,
                                error: error_1 instanceof Error ? error_1.message : String(error_1)
                            }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SqlTools.prototype.describeTable = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var connectionString, tableName, tableInfoQuery, columnsQuery, _a, tableInfo, columns, error_2;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        connectionString = args.connectionString, tableName = args.tableName;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        tableInfoQuery = "\n        SELECT t.object_id AS id, t.name, s.name AS [schema], p.value AS description, t.type, u.name AS owner\n        FROM sys.tables t\n        INNER JOIN sys.schemas s ON t.schema_id = s.schema_id\n        LEFT JOIN sys.extended_properties p ON p.major_id = t.object_id AND p.minor_id = 0 AND p.name = 'MS_Description'\n        LEFT JOIN sys.sysusers u ON t.principal_id = u.uid\n        WHERE t.name = '".concat(tableName, "'");
                        columnsQuery = "\n        SELECT c.name, ty.name AS type, c.max_length AS length, c.precision, c.is_nullable AS nullable, p.value AS description\n        FROM sys.columns c\n        INNER JOIN sys.types ty ON c.user_type_id = ty.user_type_id\n        LEFT JOIN sys.extended_properties p ON p.major_id = c.object_id AND p.minor_id = c.column_id AND p.name = 'MS_Description'\n        WHERE c.object_id = (SELECT object_id FROM sys.tables WHERE name = '".concat(tableName, "')");
                        return [4 /*yield*/, Promise.all([
                                this.executeQuery(connectionString, tableInfoQuery),
                                this.executeQuery(connectionString, columnsQuery)
                            ])];
                    case 2:
                        _a = _c.sent(), tableInfo = _a[0], columns = _a[1];
                        return [2 /*return*/, {
                                success: true,
                                data: {
                                    table: ((_b = tableInfo.recordset) === null || _b === void 0 ? void 0 : _b[0]) || null,
                                    columns: columns.recordset || []
                                },
                                message: 'Table described successfully'
                            }];
                    case 3:
                        error_2 = _c.sent();
                        return [2 /*return*/, {
                                success: false,
                                error: error_2 instanceof Error ? error_2.message : String(error_2)
                            }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SqlTools.prototype.createTable = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var connectionString, sql, result, error_3;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        connectionString = args.connectionString, sql = args.sql;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.executeQuery(connectionString, sql)];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, {
                                success: true,
                                rowsAffected: ((_a = result.rowsAffected) === null || _a === void 0 ? void 0 : _a[0]) || 0,
                                message: 'Table created successfully'
                            }];
                    case 3:
                        error_3 = _b.sent();
                        return [2 /*return*/, {
                                success: false,
                                error: error_3 instanceof Error ? error_3.message : String(error_3)
                            }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SqlTools.prototype.dropTable = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var connectionString, tableName, sql, result, error_4;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        connectionString = args.connectionString, tableName = args.tableName;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        sql = "DROP TABLE ".concat(tableName);
                        return [4 /*yield*/, this.executeQuery(connectionString, sql)];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, {
                                success: true,
                                rowsAffected: ((_a = result.rowsAffected) === null || _a === void 0 ? void 0 : _a[0]) || 0,
                                message: 'Table dropped successfully'
                            }];
                    case 3:
                        error_4 = _b.sent();
                        return [2 /*return*/, {
                                success: false,
                                error: error_4 instanceof Error ? error_4.message : String(error_4)
                            }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SqlTools.prototype.insertData = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var connectionString, sql, result, error_5;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        connectionString = args.connectionString, sql = args.sql;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.executeQuery(connectionString, sql)];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, {
                                success: true,
                                rowsAffected: ((_a = result.rowsAffected) === null || _a === void 0 ? void 0 : _a[0]) || 0,
                                message: 'Data inserted successfully'
                            }];
                    case 3:
                        error_5 = _b.sent();
                        return [2 /*return*/, {
                                success: false,
                                error: error_5 instanceof Error ? error_5.message : String(error_5)
                            }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SqlTools.prototype.readData = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var connectionString, sql, result, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        connectionString = args.connectionString, sql = args.sql;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.executeQuery(connectionString, sql)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, {
                                success: true,
                                data: result.recordset || [],
                                message: 'Data retrieved successfully'
                            }];
                    case 3:
                        error_6 = _a.sent();
                        return [2 /*return*/, {
                                success: false,
                                error: error_6 instanceof Error ? error_6.message : String(error_6)
                            }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SqlTools.prototype.updateData = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var connectionString, sql, result, error_7;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        connectionString = args.connectionString, sql = args.sql;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.executeQuery(connectionString, sql)];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, {
                                success: true,
                                rowsAffected: ((_a = result.rowsAffected) === null || _a === void 0 ? void 0 : _a[0]) || 0,
                                message: 'Data updated successfully'
                            }];
                    case 3:
                        error_7 = _b.sent();
                        return [2 /*return*/, {
                                success: false,
                                error: error_7 instanceof Error ? error_7.message : String(error_7)
                            }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SqlTools.prototype.executeQuery = function (connectionString, sql) {
        return __awaiter(this, void 0, void 0, function () {
            var mssql, pool, request, result, importError_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, Promise.resolve().then(function () { return require('mssql'); })];
                    case 1:
                        mssql = _a.sent();
                        pool = new mssql.ConnectionPool(connectionString);
                        return [4 /*yield*/, pool.connect()];
                    case 2:
                        _a.sent();
                        request = pool.request();
                        return [4 /*yield*/, request.query(sql)];
                    case 3:
                        result = _a.sent();
                        return [4 /*yield*/, pool.close()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, result];
                    case 5:
                        importError_1 = _a.sent();
                        // Fallback if mssql package is not available
                        throw new Error("SQL Server functionality requires the 'mssql' package to be installed. Please run: npm install mssql\nOriginal error: ".concat(importError_1 instanceof Error ? importError_1.message : String(importError_1)));
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return SqlTools;
}());
exports.SqlTools = SqlTools;
