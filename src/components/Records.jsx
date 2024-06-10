import React from 'react'

const Records = ({data}) => {
    
  return (  
    <table className="table">
        <thead>
            <tr>
                <th scope='col'>Название</th>
                <th scope='col'>Постер</th>
                <th scope='col'>Год</th>
                <th scope='col'>Страна</th>
                <th scope='col'>Рейтинг на КиноПоиске</th>
                <th scope='col'>Описание</th>
            </tr>
        </thead>
        <tbody>
            {data.map(item => (
                <tr>
                    <td>{item.title} </td>
                    <td>{item.poster} </td>
                    <td>{item.year} </td>
                    <td>{item.country} </td>
                    <td>{item.KPrating} </td>
                    <td>{item.description} </td>
                </tr>
            ))}
        </tbody>
    </table>
  ) 
}

export default Records