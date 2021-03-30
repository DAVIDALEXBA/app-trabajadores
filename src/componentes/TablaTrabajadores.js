//Importe de librerias necesarias
import React, { useState, useEffect } from "react";
import {
    Table,
    TableContainer,
    TableHead,
    TableCell,
    TableBody,
    TableRow,
    Button,
    TextField,
    Modal,
    TablePagination,
    Paper,
} from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Avatar from '@material-ui/core/Avatar';
import InfoIcon from '@material-ui/icons/Info';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { green } from '@material-ui/core/colors';
// ******************* fin del importe ****************

const baseURL = `https://randomuser.me/api/?results=100`;


//Estilos para el modal, los botones y la tabla
const useStyles = makeStyles((theme) => ({
    modal: {
        position: "absolute",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    },
    iconos: {
        cursor: "pointer",
    },
    inputMaterial: {
        width: "30%",
    },
    inputMaterial2: {
        width: "40%",
    },
    inputMaterial3: {
        width: "60%",
    },
    large: {
        width: theme.spacing(20),
        height: theme.spacing(20),
        left: "30%",
    },
    table: {
        minWidth: 700,
    },
    //
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 840,
    },
}));

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);
// *********************** fin de los estilos *******************



const TablaTrabajadores = () => {

    //UseState para la paginacion de la tabla
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    //Funciones para cambiar de pagina y para mostrar registros por pagina
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const { modal, inputMaterial, inputMaterial2, inputMaterial3, iconos, large, table, container, root } = useStyles();
    const [data, setData] = useState([]); //UseState  para los datos del trabajdor
    const [ModalInfo, setModalInfo] = useState(false); //useState para el modal
    const [modalEliminar, setModalEliminar] = useState(false);


    const [datosSelected, setdatosSelected] = useState({
        name: {
            title: '',
            first: '',
            last: '',
        },
        location: {
            street: '',
            city: '',
            state: '',
            poscode: '',
            country: '',
            number: ''
        },
        picture: {
            large: ''
        },
        dob: {
            age: '',
        },
        cell: '',
        email: '',
        login: {
            uuid: '',
        }
    })

    //Funcion para actualizar los datos
    const handleChange = e => {
        const { id, value } = e.target;
       
        if(id==='title'){
            datosSelected.name.title = value;
        }else if(id==='first'){
            datosSelected.name.first = value;
        }else if(id==='last'){
            datosSelected.name.last = value;
        }else if(id==='street'){
            datosSelected.location.street.name = value;
        }else if(id==='number'){
            datosSelected.location.street.number = value;
        }else if(id==='city'){
            datosSelected.location.city = value;
        }else if(id==='state'){
            datosSelected.location.state = value;
        }else if(id==='country'){
            datosSelected.location.country = value;
        }else if(id==='postcode'){
            datosSelected.location.postcode = value;
        }else if(id==='age'){
            datosSelected.dob.age = value;
        }else if(id==='cell'){
            datosSelected.cell = value;
        }else if(id==='email'){
            datosSelected.email= value;
        }
        
        //console.log("id ", id, " valor ", value)

    }


    //funcion para abrir o cerrar modal
    const abrirCerrarModalInfo = () => {
        setModalInfo(!ModalInfo);
    }

    const abrirCerrarModalEliminar = () => {
        setModalEliminar(!modalEliminar);
    }

    //Funion que cambia el estado para mostrar la info del usuario
    const seleccionarConsola = (resp, caso) => {
        setdatosSelected(resp);
        (caso === 'Editar') ? abrirCerrarModalInfo() : abrirCerrarModalEliminar()

    }

    const bodyEliminar = (
        <div className={modal}>
            <div align="center">
                <p>¿Deseas eliminar a <b>{datosSelected && datosSelected.name.first}</b> ? </p>
                <Button color="secondary" onClick={() => eliminarTrabajador()}>Sí</Button>
                <Button onClick={() => abrirCerrarModalEliminar()}>No</Button>
            </div>
        </div>
    )

    //Funcion que hace el llamado a la API
    useEffect(() => {
        async function fetchData() {
            const { results } = await (await fetch(baseURL)).json();
            setData(results);
            console.log(results.length);

        }
        fetchData();
    }, []);

    //Funcion que cambia el estado de los TextField
    const changeTextfield = () => {
        const boton = document.getElementsByName('textfield');
        for (let i = 0; i < boton.length; i++) {
            boton[i].removeAttribute('disabled');
            boton[i].setAttribute('style', 'color: black')

        }

    }

    //Funcion que cambia el estado de los TextField
    const updateTrabajador = () => {
        const id = datosSelected.login.uuid;
        const n = data.filter(i => i.login.uuid === id);

        n[0].name.title = datosSelected.name.title;
        n[0].name.first = datosSelected.name.first;


        abrirCerrarModalInfo()

    }

    //Funcion para eliminar a trabajador
    const eliminarTrabajador = () => {
        const id = datosSelected.login.uuid;
        const n = data.filter(i => i.login.uuid !== id);
        setData(n);
        abrirCerrarModalEliminar()
    }

    //Funcion para mostrar informacion en el modal del usuario seleccionado
    const bodyInfo = (

        <div className={modal}>
            <h3>Mas Información  <Edit onClick={() => changeTextfield()} /></h3>
            <Avatar alt="Remy Sharp" src={datosSelected && datosSelected.picture.large} className={large} />
            <br />

            <h4>Nombre</h4>
            <TextField id="title" name="textfield" disabled variant="outlined" className={inputMaterial} onChange={handleChange} label="Titulo" defaultValue={datosSelected && datosSelected.name.title} />
            <TextField id="first" name="textfield" disabled variant="outlined" className={inputMaterial} onChange={handleChange} label="Nombre" defaultValue={datosSelected && datosSelected.name.first} />
            <TextField id="last" name="textfield" disabled variant="outlined" className={inputMaterial} onChange={handleChange} label="Apellido" defaultValue={datosSelected && datosSelected.name.last} />
            <br /><br />

            <h4>Dirección</h4>
            <TextField id="street" name="textfield" disabled variant="outlined" className={inputMaterial3} onChange={handleChange} label="Calle" defaultValue={datosSelected && datosSelected.location.street.name} />
            <TextField id="number" name="textfield" disabled variant="outlined" className={inputMaterial2} onChange={handleChange} label="Número" defaultValue={datosSelected && datosSelected.location.street.number} /><br /><br />
            <TextField id="city" name="textfield" disabled variant="outlined" className={inputMaterial2} onChange={handleChange} label="Ciudad" defaultValue={datosSelected && datosSelected.location.city} />
            <TextField id="state" name="textfield" disabled variant="outlined" className={inputMaterial3} onChange={handleChange} label="Estado" defaultValue={datosSelected && datosSelected.location.state} /><br /><br />
            <TextField id="country" name="textfield" disabled variant="outlined" className={inputMaterial2} onChange={handleChange} label="Pais" defaultValue={datosSelected && datosSelected.location.country} />
            <TextField id="postcode" name="textfield" disabled variant="outlined" className={inputMaterial2} onChange={handleChange}  label="Poscode" defaultValue={datosSelected && datosSelected.location.postcode} />

            <br /><br />
            <h4>Datos personales</h4>
            <TextField id="age" name="textfield" disabled variant="outlined" className={inputMaterial} onChange={handleChange} label="Edad" defaultValue={datosSelected && datosSelected.dob.age} />
            <TextField id="cell" name="textfield" disabled variant="outlined" className={inputMaterial2} onChange={handleChange} label="Telefono" defaultValue={datosSelected && datosSelected.cell} /><br /><br />
            <TextField id="email" name="textfield" disabled variant="outlined" className={inputMaterial3} onChange={handleChange} label="Email" defaultValue={datosSelected && datosSelected.email} />
            <br /><br />
            <div align="right">
                <Button color="primary" onClick={() => abrirCerrarModalInfo()}>Salir</Button>
                <Button name="textfield"  onClick={() => updateTrabajador()}>Actualizar Datos</Button>
            </div>
        </div>
    )

    return (
        <>
            <Paper className={root}>
                <TableContainer className={container}>
                    <Table className={table} stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell> Nombre </StyledTableCell>
                                <StyledTableCell> Edad </StyledTableCell>
                                <StyledTableCell> Telefono </StyledTableCell>
                                <StyledTableCell> Direccion </StyledTableCell>
                                <StyledTableCell> Email </StyledTableCell>
                                <StyledTableCell> Acciones </StyledTableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(
                                (resp) => (
                                    <StyledTableRow key={resp.login.uuid}>
                                        <StyledTableCell>
                                            {" "}
                                            <Avatar alt="Remy Sharp" src={resp.picture.thumbnail} />
                                            {resp.name.title} {resp.name.first} {resp.name.last}{" "}
                                        </StyledTableCell>
                                        <StyledTableCell> {resp.dob.age} </StyledTableCell>
                                        <StyledTableCell> {resp.cell} </StyledTableCell>
                                        <StyledTableCell>
                                            {" "}
                                            {resp.location.street.name} {resp.location.street.number}, {resp.location.city} {resp.location.country}{" "}
                                        </StyledTableCell>
                                        <StyledTableCell> {resp.email} </StyledTableCell>
                                        <StyledTableCell>
                                            <InfoIcon className={iconos} onClick={() => seleccionarConsola(resp, 'Editar')} color="primary" />
                                        &nbsp;&nbsp;&nbsp;
                                        <Delete color="secondary" onClick={() => seleccionarConsola(resp, 'Eliminar')} />
                                        </StyledTableCell>
                                    </StyledTableRow>
                                )
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <AddBoxIcon style={{ color: green[500] ,fontSize: 60 } }  onClick={() => seleccionarConsola(null, 'Editar')}/>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />

                <Modal open={ModalInfo} onClose={abrirCerrarModalInfo}>
                    {bodyInfo}
                </Modal>

                <Modal
                    open={modalEliminar}
                    onClose={abrirCerrarModalEliminar}>
                    {bodyEliminar}
                </Modal>
            </Paper>
        </>
    );
};

export default TablaTrabajadores;
