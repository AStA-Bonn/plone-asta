import React from 'react';
import cx from 'classnames';
import {
  flattenToAppURL,
  isInternalURL,
  withBlockExtensions,
} from '@plone/volto/helpers';

function mapToDay(day: 'mo' | 'di' | 'mi' | 'do' | 'fr') {
  return {'mo': 'Montag', 'di': "Dienstag", 'mi': "Mittwoch", 'do': "Donnerstag", 'fr': 'Freitag'}[day];
}

const ReferatsView = (props) => {
  const { className, data, detached, properties, style} = props;

  console.log(props.data); const isOrt = props?.data?.ort && props.data.ort.length > 2;
  const isName = props?.data?.name && props.data.name.length > 2;
  // isMail is bool
  const AttrBox = ({ desc, content, attrType }: { desc: string, content: string, attrType?: 'email' | 'phone'}) => {
    if (!content || content.length < 1) {
     return <div></div>;
    }
    return (
      <div style={{fontSize: '1rem' }}>
        <p style={{ paddingTop: 0, marginTop: 0, paddingBottom: 0, marginBottom: 0 }}>
        {attrType === 'email' &&
          <a href={'mailto:' + content}>{content}</a> }
        {attrType === 'phone' &&
          <a href={'tel:' + content}>{content}</a> }
        {attrType === undefined &&
          <p>{content}</p>
        }
        </p>
        <p style={{ paddingBottom: 0, marginBottom: '0.5rem', color: 'gray', fontSize: '0.85rem' }}>
      {desc}
        </p>
      </div>
    )
  }
      //<!--AttrBox desc="Name" content={props?.data?.name}></AttrBox-->
  return (
    <div>
    <div>
      <AttrBox desc="E-Mail" attrType='email' content={props?.data?.email}></AttrBox>
      <AttrBox desc="Telefon" attrType='phone' content={props.data?.telefon}></AttrBox>
      {isOrt && <AttrBox desc="Ort" content={props?.data?.ort}></AttrBox>}
    </div>
    <div>
      <h3 style={{marginBottom: '0.25rem', fontSize: '1.3rem'}}> Mitarbeitende </h3>
      <table>
        {props?.data?.mitarbeiter?.map((mitarbeiter: {name: string; desc: string;}) => (
          <AttrBox desc={mitarbeiter.desc} content={mitarbeiter.name}></AttrBox>
        ))}
      </table>
      <h3 style={{marginBottom: '0.25rem', marginTop: '0.25rem'}}> Anwesehnheitszeiten </h3>
      <table>
        {props?.data?.anwesenheitsdienste?.map((anweseneheit) => (
          <AttrBox desc={mapToDay(anweseneheit.tag)} content={`${anweseneheit.startHour} - ${anweseneheit.endHour}`}></AttrBox>
        ))}
      </table>
    </div>
</div>
  );
};

export default withBlockExtensions(ReferatsView);
