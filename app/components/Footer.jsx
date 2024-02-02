import {NavLink} from '@remix-run/react';
import {useRootLoaderData} from '~/root';
import footerLogo from '../assets/logo-brandz-large-white.png';

//logos here
import {FaFacebook} from 'react-icons/fa';
import {FaLinkedinIn} from 'react-icons/fa';
import {FaTwitter} from 'react-icons/fa';
/**
 * @param {FooterQuery & {shop: HeaderQuery['shop']}}
 */
export function Footer({menu, shop}) {
  return (
    <footer className="bg-black mt-[5em]">
      <FooterMenu />
    </footer>
  );
}

/**
 * @param {{
 *   menu: FooterQuery['menu'];
 *   primaryDomainUrl: HeaderQuery['shop']['primaryDomain']['url'];
 * }}
 */
function FooterMenu() {
  const {publicStoreDomain} = useRootLoaderData();
  const company = [
    'Our Story',
    'Our Services',
    'Our Clients',
    'Our Results',
    'Our Info',
    "account "
  ];
  const socials = [
    {
      tag: (
        <FaFacebook className="text-2xl text-brandRed mx-2 transition-all hover:scale-105 hover:text-white" />
      ),
      href: 'fb.com',
    },
    {
      tag: (
        <FaLinkedinIn className="text-2xl text-brandRed mx-2 transition-all hover:scale-105 hover:text-white" />
      ),
      href: 'https://www.linkedin.com/company/tantvstudios',
    },
    {
      tag: (
        <FaTwitter className="text-2xl text-brandRed mx-2 transition-all hover:scale-105 hover:text-white" />
      ),
      href: 'fb.com',
    },
  ];

  return (
    <nav className="min-h-[50vh] flex flex-col py-4 px-4" role="navigation">
      <img className="h-6 w-[12em]" src={footerLogo} alt="" />
      <div className="flex-wrap flex mt-4 h-[100%]  w-[90%] mx-auto md:justify-between">
        <div className=" flex flex-col mr-4">
          {company.map((item) => {
            return (
              <NavLink
                end
                key={item}
                prefetch="intent"
                style={activeLinkStyle}
                to={item}
                className="my-2"
              >
                {item}
              </NavLink>
            );
          })}
        </div>
        <div className=" mx-4 mt-4">
          <h1 className="text-white my-2 font-black text-xl">legal</h1>
          <p className="text-white">Disclaimer</p>
          <div className=" flex mt-4">
            {socials.map(({tag, href}) => {
              return (
                <a href={href} target="_blank">
                  {tag}
                </a>
              );
            })}
          </div>
        </div>
        <div className="lg:w-[25%]    grid">
          <h1 className="text-2xl font-[PoppinsBold] text-white ">
            Intersted in Learning more? Schedule a consultation
          </h1>
          <a
            href="/"
            className="border-[2px] border-brandRed text-brandRed py-4 px-4 rounded-full hover:bg-brandRed hover:text-white decoration-[none] h-fit text-center w-fit"
          >
            Send us a message
          </a>
        </div>
        <div className="text-white border-l-[2px] border-brandRed px-4 mt-2">
          <h1 className="text-xl font-black">Contact Us</h1>
          <p className="text-lg font-bold text-brandRed">address</p>
          <a
            className=""
            href="https://maps.apple.com/?address=3400%20Prospect%20St%20NW,%20Washington,%20DC%20%2020007,%20United%20States&ll=38.905594,-77.068192&q=3400%20Prospect%20St%20NW&t=r"
            target="_blank"
          >
            3400 Prospect St NW, Washington, DC 20007
          </a>
          <h2 className="text-white text-lg font-black">
            Hours of Operation:{'  '}
            <span className="font-light">9:00 am - 6:00 pm</span>
          </h2>
          <p className="text-white">(Monday - Fridays,Except US holiday)</p>
          <div className="flex justify-between mt-4">
            <h1 className="font-black">
              Office<br></br>{' '}
              <a
                href="tel: +1 202-903-7470"
                className="font-light text-brandRed"
              >
                +1 202-903-7470{' '}
              </a>
            </h1>
            <h1 className="ml-4 font-black">
              Email <br></br>
              <a
                href="mailto:engage@tantvstudios.com"
                className="font-light text-brandRed"
              >
                engage@tantvstudios.com{' '}
              </a>
            </h1>
          </div>
        </div>
      </div>
    </nav>
  );
}

const FALLBACK_FOOTER_MENU = {
  id: 'gid://shopify/Menu/199655620664',
  items: [
    {
      id: 'gid://shopify/MenuItem/461633060920',
      resourceId: 'gid://shopify/ShopPolicy/23358046264',
      tags: [],
      title: 'Privacy Policy',
      type: 'SHOP_POLICY',
      url: '/policies/privacy-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633093688',
      resourceId: 'gid://shopify/ShopPolicy/23358013496',
      tags: [],
      title: 'Refund Policy',
      type: 'SHOP_POLICY',
      url: '/policies/refund-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633126456',
      resourceId: 'gid://shopify/ShopPolicy/23358111800',
      tags: [],
      title: 'Shipping Policy',
      type: 'SHOP_POLICY',
      url: '/policies/shipping-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633159224',
      resourceId: 'gid://shopify/ShopPolicy/23358079032',
      tags: [],
      title: 'Terms of Service',
      type: 'SHOP_POLICY',
      url: '/policies/terms-of-service',
      items: [],
    },
  ],
};

/**
 * @param {{
 *   isActive: boolean;
 *   isPending: boolean;
 * }}
 */
function activeLinkStyle({isActive, isPending}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'white',
  };
}

/** @typedef {import('storefrontapi.generated').FooterQuery} FooterQuery */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
