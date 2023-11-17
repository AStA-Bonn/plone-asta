import React from 'react';

const ReferatsView = (props) => {
  console.log(props.data);
  return (
    <div>
     <table>
  <tr>
    <td>Name</td>
    <td>{props?.data?.name}</td>
  </tr>
  <tr>
    <td>Email</td>
    <td>{props?.data?.email}</td>
  </tr>
      {props?.data?.mitarbeiter.map((mitarbeiter) => (
          <tr>
            <td>Mitarbeiter</td>
            <td>{mitarbeiter.name}</td>
          </tr>
      ))}
    {props?.data?.anwesenheitsdienste.map((anweseneheit) => (
        <tr>
          <td>{anweseneheit.tag}</td>
            <td>
              {anweseneheit.startHour} - {anweseneheit.endHour}
            </td>
        </tr>
    ))}
    </table>
    </div>
  );
};

export default ReferatsView;
