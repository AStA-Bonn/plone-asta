import React from 'react';
import ReferatsView from './ReferatView';
import { Segment, Form } from 'semantic-ui-react';
import { SidebarPortal, Field } from '@plone/volto/components';

const ReferatsEdit = (props) => {
  const { selected, onChangeBlock, block, data } = props;
  return (
    <div>
      <SidebarPortal selected={selected}>
        <Segment.Group raised>
          <header className="header pulled">
            <h2>Data table</h2>
          </header>

          <Form>
            <Field
              id="Referatsname"
              widget="object_browser"
              title="File"
              value={data.file_path || []}
              mode="link"
              onChange={(id, value) =>
                onChangeBlock(block, { ...data, [id]: value })
              }
            />
          </Form>
        </Segment.Group>
      </SidebarPortal>

      <ReferatsView />
    </div>
  );
};

export default ReferatsEdit;
