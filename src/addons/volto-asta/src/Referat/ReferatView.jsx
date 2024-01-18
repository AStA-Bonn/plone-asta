import React from 'react';
import cx from 'classnames';
import {
  flattenToAppURL,
  isInternalURL,
  withBlockExtensions,
} from '@plone/volto/helpers';

const ReferatsView = ({ className, data, detached, properties, style}) => {
  const isOrt = data?.ort && data.ort.length > 0
  const isName = data?.name && data.name.length > 0;
  const isTelefon = data?.telefon && data.telefon.length > 0;
  const isMitarbeitende = data?.mitarbeiter && data.mitarbeiter.length > 0;
  const isAnwensheitsdienste = data?.anwesenheitsdienste?.telefon && data.anwesenheitsdienste.length > 0;
  return (
    <p
      className={cx(
        'block image align',
        {
          center: !Boolean(data.align),
          detached,
        },
        data.align,
        className,
      )}
      style={style}
    >
    <div>
        {isName &&
            <h2> {data?.name}</h2>
        }
      <table>
        {isOrt && <tr>
          <td>Ort</td>
            <td> {data?.ort}</td>
          </tr>
        }
        <tr>
          <td>Email</td>
          <td>
            <a href={'mailto:' + data?.email}>{data?.email}</a>
          </td>
        </tr>
        <tr>
          <td>Telefon</td>
          <td>
            <a href={'tel::' + data?.telefon}>{data?.telefon}</a>
          </td>
        </tr>
    </table>
    <h3> Mitarbeitende </h3>
    <table>
         {data?.mitarbeiter?.map((mitarbeiter) => (
          <tr>
            <td>{mitarbeiter.name}</td>
            <td>{mitarbeiter.desc}</td>
          </tr>
        ))}
    </table>
    <h3> Anwesehnheitszeiten </h3>
    <table>
         {data?.anwesenheitsdienste?.map((anweseneheit) => (
          <tr>
            <td>{anweseneheit.tag}</td>
            <td>
              {anweseneheit.startHour} - {anweseneheit.endHour}
            </td>
          </tr>
        ))}
      </table>
    </div>
  </p>
  );
};

export default withBlockExtensions(ReferatsView);
