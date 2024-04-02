import React from 'react'
import { TProduct } from '../../interfaces/TProducts'
import { Link } from 'react-router-dom'

type Props = {
  products:TProduct[],
  onDelete : (id : number | undefined) => void;
}

const Dashboard = ({products , onDelete}: Props) => {
  const handleDelete = (id:number | undefined ) => {
    onDelete(id) 
  }
  return (
    <div>
      <div>
      <h1>Hello, admin</h1>
      <Link to="/admin/add" className="btn btn-primary">
        Add new product
      </Link>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map( i=> (
            <tr key={i.id}>
               <td>{i.id}</td>
              <td>{i.title}</td>
              <td>{i.price}</td>
              <td>{i.description}</td>
              <td>
                <button className='btn btn-danger' onClick={() => handleDelete(Number(i.id))}>Delete</button>
                <Link to={`/admin/edit/${i.id}`} className='btn btn-primary'>Update</Link>
              </td>
            </tr>
          ))}
          
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default Dashboard