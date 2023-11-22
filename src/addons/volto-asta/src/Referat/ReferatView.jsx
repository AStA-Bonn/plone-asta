import React from 'react';

const ReferatsView = (props) => {
  console.log(props.data);
  const isOrt = props?.data?.ort && props.data.ort.length > 2;
  const isName = props?.data?.name && props.data.name.length > 2;
  return (
    <div>
      <table>
        {isName && <tr>
          <td>Ort</td>
            <td>{props?.data?.name}</td>
          </tr>
        }
        {isOrt && <tr>
          <td>Ort</td>
            <td>{props?.data?.ort}</td>
          </tr>
        }
        <tr>
          <td>Email</td>
          <td>
            <a href={'mailto:' + props?.data?.email}>{props?.data?.email}</a>
          </td>
        </tr>
        <tr>
          <td>Telefon</td>
          <td>
            <a href={'tel::' + props?.data?.telefon}>{props?.data?.telefon}</a>
          </td>
        </tr>
    </table>
    <h3> Mitarbeitende </h3>
    <table>
        {props?.data?.mitarbeiter?.map((mitarbeiter) => (
          <tr>
            <td>{mitarbeiter.name}</td>
            <td>{mitarbeiter.desc}</td>
          </tr>
        ))}
    </table>
    <h3> Anwesehnheitszeiten </h3>
    <table>
        {props?.data?.anwesenheitsdienste?.map((anweseneheit) => (
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
