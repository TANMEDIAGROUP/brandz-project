import {useState} from 'react';
import {Await, NavLink} from '@remix-run/react';
import {Suspense} from 'react';
import {useRootLoaderData} from '~/root';
import mainLogo from '../assets/logo-brandz-large.png';
import {RxCross1} from 'react-icons/rx';
import {MdOutlineShoppingCart} from 'react-icons/md';
import {FaSearch} from 'react-icons/fa';
import {HiMenuAlt3} from 'react-icons/hi';

/**
 * @param {HeaderProps}
 */
export function Header({header, isLoggedIn, cart}) {
  const {shop, menu} = header;
  return (
    <header className=" flex h-[5em] fixed w-[100%] backdrop-blur-md shadow-sm z-[100] items-center px-5 justify-between ">
      <NavLink prefetch="intent" to="/" style={activeLinkStyle} end>
        <img src={mainLogo} alt="" className="h-5" />
      </NavLink>
      <HeaderMenu menu={menu} cart={0} />
      {/* <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} /> */}
    </header>
  );
}

/**
 * @param {{
 *   menu: HeaderProps['header']['menu'];
 *   cart:HeaderProps
 *   primaryDomainUrl: HeaderQuery['shop']['primaryDomain']['url'];
 *   viewport: Viewport;
 * }}
 */
export function HeaderMenu({menu, cart}) {
  const [sidemenu, setsidemenu] = useState(
    ' polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
  );
  const [sideinner, setsideinner] = useState(false);
  const {publicStoreDomain} = useRootLoaderData();
  const navLinks = [
    'Our Story',
    {'Our Services': ['Service 1', 'Service 2', 'Service 3']},
    'Work With Us!',
    'Our Clients',
    'Contact Us',
  ];

  return (
    <div className="">
      <nav className="header-ctas" role="navigation">
        {/* 
      <NavLink prefetch="intent" to="/account" style={activeLinkStyle}>
        {isLoggedIn ? 'Account' : 'Sign in'}
      </NavLink> */}
        <SearchToggle />
        <CartToggle cart={cart} />
        <HiMenuAlt3
          onClick={() => {
            setsidemenu(' polygon(100% 0, 0 0, 0 100%, 100% 100%)');
          }}
          className="text-3xl transition-all hover:scale-105 hover:text-brandRed"
        />
      </nav>
      <nav
        className="fixed right-0 bg-brandRed min-w-[40%] min-h-screen top-0 transition-all z-[100]"
        role="navigation"
        style={{clipPath: sidemenu}}
      >
        <RxCross1
          className="text-white mt-3 ml-5 text-4xl hover:scale-[1.2] transition-all"
          onClick={(e) => {
            setsidemenu('polygon(100% 0, 100% 0, 100% 100%, 100% 100%)');
          }}
        />
        <div className="flex flex-col px-5 pt-12 justify-evenly min-h-[60vh]">
          {(navLinks || navLinks).map((item) => {
            if (typeof item == 'object') {
              return (
                <div
                  onMouseOver={() => {
                    setsideinner(true);
                  }}
                  onMouseLeave={() => {
                    setsideinner(false);
                  }}
                  className="text-white text-3xl py-2 font-bold hover:scale-105 transition-all hover:pl-5 hover:border-white border-b-2 border-white hover:decoration-[none]"
                >
                  <NavLink
                    className="text-white text-3xl py-2 font-bold hover:scale-105 transition-all  w-full grid"
                    key={item}
                    to={item}
                  >
                    {Object.keys(item)}
                  </NavLink>
                  <div
                    className=" flex flex-col "
                    style={{
                      clipPath: !sideinner
                        ? 'polygon(0 0, 100% 0%, 100% 0, 0 0)'
                        : 'polygon(0 0, 100% 0%, 100% 100%, 0 100%)',
                      height: !sideinner ? '0px' : 'fit-content',
                    }}
                  >
                    {item['Our Services'].map((inner) => {
                      console.log(item);
                      return (
                        <NavLink className="text-white text-2xl py-2 font-bold hover:scale-105 transition-all hover:pl-5 hover:border-white border-b-2 border-white hover:decoration-[none] ml-6">
                          {inner}
                        </NavLink>
                      );
                    })}
                  </div>
                </div>
              );
            } else {
              return (
                <NavLink
                  className="text-white text-3xl py-2 font-bold hover:scale-105 transition-all hover:pl-5 hover:border-white border-b-2 border-white hover:decoration-[none]"
                  key={item}
                  to={item}
                >
                  {item}
                </NavLink>
              );
            }
          })}
        </div>
      </nav>
    </div>
  );
}

/**
 * @param {Pick<HeaderProps, 'isLoggedIn' | 'cart'>}
 */
function HeaderCtas({isLoggedIn, cart}) {
  return (
    <nav className="header-ctas" role="navigation">
      {/* 
      <NavLink prefetch="intent" to="/account" style={activeLinkStyle}>
        {isLoggedIn ? 'Account' : 'Sign in'}
      </NavLink> */}
    </nav>
  );
}

function SearchToggle() {
  const [searchbtn, setsearchbtn] = useState('none');
  const [searchresults, setsearchresults] = useState('none');
  return (
    <button className="relative font-bold text-2xl flex flex-row-reverse">
      <FaSearch
        className="transition-all hover:scale-105 hover:text-brandRed"
        onClick={() => {
          setsearchbtn('grid');
        }}
      />
      <input
        type="text"
        name=""
        id=""
        style={{display: searchbtn}}
        autoFocus
        onChange={() => {
          setsearchresults('grid');
        }}
        className=" absolute top-[-.2em] py-1 border-none  font-thin rounded-full bg-slate-50 px-3 mr-8 focus:outline-[none]"
        placeholder="search"
      />
      <div
        style={{display: searchresults}}
        className="fixed w-[100vw] z-[30] shadow-sm backdrop-blur-md bg-[#f6f6f660] left-0 top-[3.2em] min-h-[30vh] "
      ></div>
    </button>
  );
}

/**
 * @param {{count: number}}
 */
function CartBadge({count}) {
  return (
    <NavLink
      className="relative flex  py-2 px-1 transition-all hover:scale-105"
      to={'/cart'}
    >
      <MdOutlineShoppingCart className="text-3xl transition-all hover:scale-105 hover:text-brandRed" />
      {count && count > 0 ? (
        <p className="absolute -top-0 -right-1 w-6 h-6 grid justify-center rounded-full bg-black text-white font-bold  z-[4]">
          {count}
        </p>
      ) : (
        <></>
      )}
    </NavLink>
  );
}

/**
 * @param {Pick<HeaderProps, 'cart'>}
 */
function CartToggle({cart}) {
  return (
    <Suspense fallback={<CartBadge count={0} />}>
      <Await resolve={cart}>
        {(cart) => {
          if (!cart) return <CartBadge count={0} />;
          return <CartBadge count={cart.totalQuantity || 0} />;
        }}
      </Await>
    </Suspense>
  );
}

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/461609500728',
      resourceId: null,
      tags: [],
      title: 'Collections',
      type: 'HTTP',
      url: '/collections',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609533496',
      resourceId: null,
      tags: [],
      title: 'Blog',
      type: 'HTTP',
      url: '/blogs/journal',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609566264',
      resourceId: null,
      tags: [],
      title: 'Policies',
      type: 'HTTP',
      url: '/policies',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599032',
      resourceId: 'gid://shopify/Page/92591030328',
      tags: [],
      title: 'About',
      type: 'PAGE',
      url: '/pages/about',
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
    color: isPending ? 'grey' : 'black',
  };
}

/** @typedef {Pick<LayoutProps, 'header' | 'cart' | 'isLoggedIn'>} HeaderProps */
/** @typedef {'desktop' | 'mobile'} Viewport */

/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
/** @typedef {import('./Layout').LayoutProps} LayoutProps */
