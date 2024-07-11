import React from 'react';
import { Table } from 'react-bootstrap';

const formatDate = (dateString) => {
    if (!dateString) return '';
    return dateString.split('T')[0];
};

const DataTable = ({ data, columns }) => {
    const formattedData = data.rows.map(row => {
        const formattedRow = { ...row };
        for (let col of columns) {
            if (col.key.includes('date')) {
                formattedRow[col.key] = formatDate(row[col.key]);
            }
        }
        return formattedRow;
    });

    return (
        <div>
            <p style={{marginTop: 50, color: "white"}}>Количество элементов: {data.count}</p>
            <Table
                striped 
                bordered 
                hover 
                style={{ 
                    margin: "0 auto", 
                    width: '100%', 
                    backgroundColor: 'transparent',
                    textAlign: 'center',
                }}
            >
                <thead >
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index}>{col.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {formattedData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((col, colIndex) => (
                                <td key={colIndex}>{row[col.key]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default DataTable;
