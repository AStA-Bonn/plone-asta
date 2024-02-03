import React from 'react';
import ReferatsView from './ReferatView';
import { Segment, Form } from 'semantic-ui-react';
import { SidebarPortal, Field } from '@plone/volto/components';
import { ReferatsSchema } from './schema';
import { InlineForm } from '@plone/volto/components';

const ReferatsEdit = (props) => {
  const { selected, onChangeBlock, block, data } = props;
  const schema = ReferatsSchema(props);
  return (
    <div>
      <SidebarPortal selected={selected}>
        <Segment.Group raised>
          <header className="header pulled">
            <h2>Data table</h2>
          </header>

          <InlineForm
            schema={schema}
            title={schema.title}
            onChangeField={(id, value) => {
              onChangeBlock(block, {
                ...data,
                [id]: value,
              });
            }}
            formData={data}
          />
        </Segment.Group>
      </SidebarPortal>

      <ReferatsView {...props} />
    </div>
  );
};

export default ReferatsEdit;
