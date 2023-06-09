import { Link, graphql, useStaticQuery } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image';
import React from 'react'

import { CallToActionButton } from '../CallToActionButton';

export const Menu = () => {

  const data = useStaticQuery(graphql`
    query MainMenuQuery {
      wp {
        acfOptionsMainMenu {
          mainMenu {
            callToActionButton {
              destination {
                ... on WpPage {
                  uri
                }
              }
              label
            }
            menuItems {
              root {
                destination {
                  ... on WpPage {
                    uri
                  }
                }
                label
              }
              subMenuItems {
                label
                destination {
                  ... on WpPage {
                    uri
                  }
                }
              }
            }
          }
        }
      }
    }
  `)
  console.log("MAIN MENU DATA: ", data);
  const {menuItems} = data.wp.acfOptionsMainMenu.mainMenu
  return (
    <div className='bg-gradient-to-tr from-british-racing-green to-emerald-900 text-white px-4 font-bold sticky flex justify-between items-center top-0 z-20 h-16'>
      {/* render logo */}
      <Link to="/">
        <StaticImage src='../../../static/icon.png' layout='fixed' height={30} alt="logo" />
      </Link>
      {/* render menu items */}
      <div className='flex h-full flex-1 justify-end'>
        {(menuItems || []).map((menuItem, index) => (
          <div
            key={index}
            className='group relative flex h-full cursor-pointer hover:bg-emerald-800'
          >
            <Link to={menuItem.root.destination.uri} className='px-4 flex h-full items-center text-white no-underline'>
              {menuItem.root.label}
            </Link>
            {!!menuItem.subMenuItems?.length &&
              <div className='group-hover:block hidden bg-emerald-800 text-right absolute top-full right-0'>
                {menuItem.subMenuItems.map((subMenuItem, index) => (
                  <Link
                    to={subMenuItem.destination.uri}
                    key={index}
                    className='block whitespace-nowrap text-white p-4 no-underline hover:bg-emerald-700'
                  >
                    {subMenuItem.label}
                  </Link>
                ))}
              </div>
            }
          </div>
        ))}
      </div>
      {/* render button call to action */}
      <div className='pl-4'>
        <CallToActionButton
          label={data.wp.acfOptionsMainMenu.mainMenu.callToActionButton.label}
          destination={data.wp.acfOptionsMainMenu.mainMenu.callToActionButton.destination.uri}
        />
      </div>
    </div>
  )
}