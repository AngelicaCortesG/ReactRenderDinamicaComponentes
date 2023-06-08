import React from 'react'
import { useState } from 'react'
import { baseColaboradores } from './BaseColaboradores'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const ListadoInicial = () => {
    const [nombreColaborador, setNombreColaborador] = useState("")
    const [correoColaborador, setCorreoColaborador] = useState("")
    const [listaColaborador, setListaColaborador] = useState(baseColaboradores)
    const longitud = listaColaborador.length
    const isForEmpty = !nombreColaborador || !correoColaborador;
    const [contador, setContador] = useState(3);
    const [filtro, setFiltro] = useState('');

    const enviarFormulario = (e) => {
        e.preventDefault()
        setListaColaborador([...listaColaborador, { id: contador + 1, estado: "✅", nombre: nombreColaborador, correo: correoColaborador }])
        setNombreColaborador("")// esto es para limpiar el input
        setCorreoColaborador("")// esto es para limpiar el input
        setContador(contador + 1);
        console.log(listaColaborador)
    }

    const capturaInputNombre = (e) => {
        setNombreColaborador(e.target.value)
    }

    const capturaInputCorreo = (e) => {
        setCorreoColaborador(e.target.value)
    }
    const eliminarColaborador = (colaboradorId) => {
        setListaColaborador((prevColaborador) =>
            prevColaborador.filter((colaborador) => colaborador.id !== colaboradorId)
        );
    };

    const filtrarColaboradores = () => {
        return listaColaborador.filter((colaborador) =>
            colaborador.nombre.toLowerCase().includes(filtro.toLowerCase())
        );
    };

    return (
        <div>
            <Form className='formulario' onSubmit={enviarFormulario}>
            <h1>BASE DE DATOS COLABORADORES</h1>
                <Form.Group className="mb-4 d-flex" controlId="formBasicEmail">
                    <Form.Label className='label'>Nombre del colaborador</Form.Label>
                    <Form.Control className="form-control-sm" type="text" placeholder="Ingresa el nombre del colaborador" name="nombreColaborador" onChange={capturaInputNombre} value={nombreColaborador} />
                </Form.Group>

                <Form.Group className="mb-4 d-flex" controlId="formBasicPassword">
                    <Form.Label className='label'>Correo del colaborador</Form.Label>
                    <Form.Control className="form-control-sm" type="email" placeholder="Ingresa el correo del colaborador" name="correoColaborador" onChange={capturaInputCorreo} value={correoColaborador} />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={isForEmpty}>Agregar Colaborador</Button>
                <p></p>


                <Form.Group className="mb-4" controlId="formBasicEmail" variant="danger">
                    <Form.Control type="text" placeholder="Buscar" onChange={(e) => setFiltro(e.target.value)} />
                    <Form.Label>Busqueda de colaboradores</Form.Label>
                </Form.Group>

                <h6 >Total colaboradores: {longitud}</h6>
                <Table striped="columns" bordered hover size="sm" variant="primary">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Est</th>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtrarColaboradores().map((colaborador) => (
                            <tr key={colaborador.nombre}>
                                <td>{colaborador.id}</td>
                                <td>{colaborador.estado}</td>
                                <td>{colaborador.nombre}</td>
                                <td>{colaborador.correo}</td>
                                <td><Button variant="primary" onClick={() => eliminarColaborador(colaborador.id)}>Borrar</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Form>
        </div>
    )
}

export default ListadoInicial