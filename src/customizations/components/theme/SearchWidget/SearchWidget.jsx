/*
 * WHY?!
 * The original component attaches search to the subpath: if i am on /de/foo, then the search will be /de/foo/search
 * That does not work! In this component we attach the search to '/de/search' or '/en/search'
 */
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { getNavroot } from '@plone/volto/actions';
import { hasApiExpander, getBaseUrl } from '@plone/volto/helpers';
import { Icon } from '@plone/volto/components';
import zoomSVG from '@plone/volto/icons/zoom.svg';

const messages = defineMessages({
  search: {
    id: 'Search',
    defaultMessage: 'Search',
  },
  searchSite: {
    id: 'Search Site',
    defaultMessage: 'Search Site',
  },
});

const SearchWidget = (props) => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const [text, setText] = useState('');
  const history = useHistory();
  const onChangeText = (event, { value }) => {
    setText(value);
  };
  const pathname = props.pathname;
  const onSubmit = (event) => {
    //const path = pathname?.length > 0 ? `&path=${encodeURIComponent(pathname)}` : '';
    const path = '';

    if (pathname.includes('/de')) {
      history.push(`/de/search?SearchableText=${encodeURIComponent(text)}${path}`);
    } else {
      history.push(`/en/search?SearchableText=${encodeURIComponent(text)}${path}`);
    }
    // reset input value
    setText('');
    event.preventDefault();
  };

  const navroot = useSelector((state) => state.navroot?.data);
  useEffect(() => {
    console.log({ navroot, url: getBaseUrl(pathname) });
    if (!hasApiExpander('navroot', getBaseUrl(pathname))) {
      dispatch(getNavroot(getBaseUrl(pathname)));
    }
  }, [dispatch, pathname]);

  return (
    <Form action={`${navroot?.navroot?.['@id']}/search`} onSubmit={onSubmit}>
      <Form.Field className="searchbox">
        <Input aria-label={intl.formatMessage(messages.search)} onChange={onChangeText} name="SearchableText" value={text} transparent autoComplete="off" placeholder={intl.formatMessage(messages.searchSite)} title={intl.formatMessage(messages.search)} />
        <button aria-label={intl.formatMessage(messages.search)}>
          <Icon name={zoomSVG} size="18px" />
        </button>
      </Form.Field>
    </Form>
  );
};

export default SearchWidget;
