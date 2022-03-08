import { Fragment } from 'react';

import { getChildrenFrom, createShallowRenderer } from './shallowHelpers';

describe('getChildrenFrom', () => {
  it('returns no children', () => {
    const element = <div />;

    const children = getChildrenFrom(element);

    expect(children).toEqual([]);
  });

  it('returns direct children', () => {
    const element = (
      <div>
        <p>A</p>
        <p>B</p>
      </div>
    );

    const children = getChildrenFrom(element);

    expect(children).toEqual([<p>A</p>, <p>B</p>]);
  });

  it('returns text as an array of one item', () => {
    const element = <div>text</div>;

    const children = getChildrenFrom(element);

    expect(children).toEqual(['text']);
  });

  it('returns no children for text', () => {
    const element = 'text';

    const children = getChildrenFrom(element);

    expect(children).toEqual([]);
  });

  it('returns array of children for elements with one child', () => {
    const element = (
      <div>
        <p>A</p>
      </div>
    );

    const children = getChildrenFrom(element);

    expect(children).toEqual([<p>A</p>]);
  });
});

describe('getChild', () => {
  const TestComponent = ({ children }) => <Fragment>{children}</Fragment>;

  it('returns undefined if the child does not exist', () => {
    const component = <TestComponent />;
    const { render, getChild } = createShallowRenderer();

    render(component);

    const child = getChild(0);
    expect(child).not.toBeDefined();
  });
});
