import React from "react";
import {firebase} from './firebase'

function App() {

  const [tareas, setTareas] = React.useState([])
  const [tarea, setTarea] = React.useState('')
  const [edicion, setEdicion] = React.useState(false)
  const [id, setId] = React.useState('')

  React.useEffect(() => {
    const obtenerDatos = async () => {
      try{
        const db = firebase.firestore()
        const data = await db.collection('tareas').get()
        const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        console.log(data.docs)
        setTareas(arrayData)

      }catch (error) {
        console.log(error)
      }
    }

    obtenerDatos()

  }, [])

  const agregar = async (e) => {
    e.preventDefault()

    if(!tarea.trim()){
      console.log('está vacio')
      return
    }

    try{
      const db = firebase.firestore()
      const nuevaTarea = {
        name: tarea,
        fecha: Date.now()
      }

      const data = await db.collection('tareas').add(nuevaTarea)

      setTareas([
        ...tareas,
        {
          ...nuevaTarea, id: data.id
        }
      ])
      setTarea('')

    }catch (error) {
      console.log(error)
    }

    console.log(tarea)
  }

  const eliminar = async (id) => {
    try {
      
      const db = firebase.firestore()
      await db.collection('tareas').doc(id).delete()

      const arrayFiltrado = tareas.filter(item => item.id !== id)
      setTareas(arrayFiltrado)

    } catch (error) {
      console.log(error)
    }
  }

  const activarEdicion = (item) => {
    setEdicion(true)
    setTarea(item.name)
    setId(item.id)
  }

  const editar = async (e) => {
    e.preventDefault()

    try {

      const db = firebase.firestore()
      await db.collection('tareas').doc(id).update({
        name: tarea
      })

      const arrayEditado = tareas.map(item => (
        item.id === id ? { id: item.id, fecha: item.fecha, name: tarea } : item
      ))
      setTareas(arrayEditado)
      setEdicion(false)
      setTarea('')
      setId('')

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container mt-5">
      <h1 className='text-center'>FIREBASE</h1>
      <hr />
      <div className="row">
        <div className="col-md-6">
          <ul className="list-group">
            {
              tareas.map(item => (
                <li className="list-group-item" key={item.id}>
                  {item.name}
                  <button className="btn btn-danger btn-sm float-right"
                    onClick={() => eliminar(item.id)}
                  >Eliminar</button>
                  <button className="btn btn-warning btn-sm mr-2 float-right"
                    onClick={() => activarEdicion(item)}
                  >Editar</button>
                </li>
              ))
            }
          </ul>
        </div>
        <div className="col-md-6">
          <h3 className="text-center">
            {
              edicion ? 'Editar tarea' : 'Agregar tarea'
            }
          </h3>
          <form onSubmit={edicion ? editar : agregar}>
            <input type="text"
              placeholder="ingrese su tarea"
              className="form-control mb-2"
              onChange={e => setTarea(e.target.value)}
              value={tarea}
            />
            <button className=
              {
                edicion ? 'btn btn-warning btn-block' : 'btn btn-dark btn-block'
              } 
              type="submit">
              {
                edicion ? 'Editar' : 'Agregar'
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
