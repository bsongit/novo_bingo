import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

type Props = {
    list: any[];
    Labels: Object[];
}


export default function GenericTable({list,Labels}: Props) {

    interface Column {
        id:'dataInicial'| 'tamanhoInicial'| 'tamanhoAtual' | 'dataFinal' | 'btnRemove' |'nome' |
        'endereco' | 'cartelas'| 'comissao' | 'editBtn' | 'data' | 'codigo'  |'valor' | 
        'telefone' | 'faturado' | 'comissaoVendedores' | 'comissaoGerentes'| 'premios' | 'saldoFinal' |
        'vendedorPhone' |  'numero' | 'printedNumber' | 'tipo' | 'codigoCartela' | 'clienteName' | 'previewFunc' | 'editFunc' |
        'pedidos' | 'valorPrestado' | 'clienteNome'| 'btnPreview' ;
        label: string;
        minWidth?: number;
        align?: 'right';
        format?: (value: number) => string;
    }
    
  var columns = Labels as Column[];
    
    
  const rows = list;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: any, newPage: React.SetStateAction<number>) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: { target: { value: string | number; }; }) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 0, minWidth: column.minWidth }}
                >
                  <b>{column.label}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
          <TableRow ><TableCell sx={{paddingTop: '32px'}} ></TableCell></TableRow>
          {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return <TableRow>
                {columns.map((column) => (
                   <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ top: 57, minWidth: column.minWidth }}
                  >
                    {row[column.id]}
                  </TableCell>
                ))}
              </TableRow>
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[1, 2, 3]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
