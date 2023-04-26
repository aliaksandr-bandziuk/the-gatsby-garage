import React from 'react'
import { BlockRendererProvider } from '@webdeveducation/wp-block-tools';
import { Link } from 'gatsby';

import { blockRendererComponents } from '../config/blockRendererComponents';

const Page = (props) => {
  console.log("page props: ", props);
  return (
    <div>
      <BlockRendererProvider
        allBlocks={props.pageContext.blocks} 
        renderComponent={blockRendererComponents}
        siteDomain={process.env.GATSBY_WP_URL}
        customInternalLinkComponent={({
          children,
          internalHref,
          className
        }, index) => {
          return (
            <Link
              to={internalHref}
              className={className}
              key={index}
            >
              {children}
            </Link>
          )
        }}
      />
    </div>
  );
}

export default Page;