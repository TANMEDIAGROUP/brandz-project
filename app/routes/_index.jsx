import {Await, useLoaderData, Link} from '@remix-run/react';
import {HiArrowRight, HiArrowLeft} from 'react-icons/hi';
import hero1 from '../assets/AdedayoHS4.jpg';
import hero2 from '../assets/BOMESI1.jpg';
import hero3 from '../assets/BOMESI-058.jpg';
import hero4 from '../assets/BOMESI_3.jpg';
import {FaArrowRightLong} from 'react-icons/fa6';
import {Suspense, useEffect, useRef, useState} from 'react';
//place holder
import img1 from '../assets/clients/1.jpg';
import img2 from '../assets/clients/2.png';
import img3 from '../assets/clients/3.png';
import img4 from '../assets/clients/4.png';
import img5 from '../assets/clients/5.jpg';

/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [{title: 'TANTV BRANDZ | Home'}];
};

/**
 * @param {LoaderFunctionArgs}
 */
export async function loader({params, context}) {
  const {storefront} = context;
  const data = await storefront.query(PRODUCT_QUERY);
  return data;
}

export default function Homepage() {
  /** @type {LoaderReturnData} */
  const data = useLoaderData(loader());
  //migrating fix
  return (
    <div className="">
      <LandingMain />
      <OurStory />
      <RecommendedProducts products={data.products} />
      <ClientSection />
    </div>
  );
}

/**
 * @param {{
 *   collection: FeaturedCollectionFragment;
 * }}
 */
function LandingMain() {
  return (
    <div className="w-full min-h-screen  md:flex flex-row-reverse justify-between items-center px-2 mt-[6em]">
      <div className="md:w-[50%] relative  md:flex ">
        <div className="mx-2 md:h-max flex md:grid h-[40%]">
          <img
            src={hero1}
            alt="HERO1"
            className="w-[50%] md:w-full rounded-lg object-cover md:h-[20em] my-2 transition-all hover:scale-105 hover:mr-10 hover:mb-4 hover:brightness-110 "
          />
          <img
            src={hero2}
            alt="HERO2"
            className="hidden md:grid w-full rounded-lg h-[100%] object-cover transition-all hover:scale-105 hover:mr-4 hover:mb-2 hover:brightness-110 "
          />
          <img
            src={hero3}
            alt="HERO2"
            className="grid md:hidden mx-1 w-[50%] rounded-lg object-cover md:h-[20em] my-2 transition-all hover:scale-105 hover:mr-10 hover:mb-4 hover:brightness-110 "
          />
        </div>
        <img
          src={hero2}
          alt="HERO2"
          className="md:hidden rounded-lg w-full object-contain transition-all hover:scale-105 hover:mr-4 hover:mb-2 hover:brightness-110 "
        />
        <img
          src={hero3}
          alt="HERO2"
          className="hidden md:grid  w-[50vw] md:w-[20em] rounded-lg object-cover  transition-all hover:scale-105 hover:mr-4 hover:mb-2 "
        />
      </div>
      <div className=" md:w-[45%] px-5 md:min-h-screen flex flex-col pt-10 justify-center">
        <div className="-mt-2 relative">
          <h1 className="text-[3.7em] font-[PoppinsBold] text-black leading-[1em] mb-2">
            TANTV
            <br />
            <span className="text-[.8em] font-[PoppinsBold]">
              {' '}
              Digital Home of the{' '}
            </span>
            <span className="text-brandRed font-[PoppinsBold]">
              African
            </span>{' '}
            Diaspora.
          </h1>
        </div>
        <p className="text-lg">
          Unconventional media company, catering to the 47million diverse
          African and Black Multicultural Diaspora. <br></br>we help brands who
          dare to connect with America’ fastest growing audience.
        </p>
        <div className="flex">
          <button className="text-md md:text-xl bg-black  rounded-full py-3 text-white w-fit my-4 mr-1 hover:scale-105 transition-all flex items-center justify-center pr-12 pl-4 relative border-2 border-black hover:bg-white hover:text-black font-semibold">
            Start Exploring
            <FaArrowRightLong className="bg-white ml-2 rounded-full text-black px-2 py-2 text-4xl absolute right-2 border-2 border-black" />
          </button>
          <button className="ml-2 text-md md:text-xl bg-brandRed px-10 rounded-full  py-3 text-white w-fit my-4 hover:scale-105 transition-all flex items-center justify-center relative border-2 border-brandRed hover:bg-white hover:text-brandRed font-semibold">
            Join Us
          </button>
        </div>
      </div>
      <div id="OurStory"></div>
    </div>
  );
}

function OurStory() {
  const brands = [
    {name: 'TANTV STUDIOS', link: 'https://www.tantvstudios.com/'},
    {name: 'TASTEMAKERS', link: '/'},
    {name: 'BRANDZ', link: '/'},
    {name: 'SYNDEX', link: '/'},
    {name: 'GDYL', link: '/'},
  ];

  return (
    <div className="grid justify-center md:mx-8 mt-12 overflow-hidden">
      <div className="flex-wrap md:flex-nowrap flex items-center  mx-4 ">
        <img
          src={hero4}
          alt=""
          className="w-[100%] md:w-[45vw] h-[20em]  object-cover"
        />
        <div className="mx-4">
          <h1 className=" font-[PoppinsBold] text-3xl mb-2">Our Story</h1>
          <p className="text-md">
            Today, the African diaspora have permanent homes outside of the
            continent but maintain their unique culture and identity by building
            communities. Black storytelling is not monolithic– what’s happening
            in American media is that stories of Black people are not
            representative of the whole story and Black people are lumped under
            one identity. Black representation on American mainstream has surely
            changed over time however there is more room for progress.
          </p>
          <h1 className="text-xl font-[PoppinsBold] text-brandRed">
            Our brands
          </h1>
          <p className="text-md">
            allows lovers of Africa, and its descendants interact, engage and be
            informed about the tasteful richness of the African & multicultural
            black diaspora community through stories that reflect their daily
            lives
          </p>
          <div className="flex w-full justify-center md:justify-left mr-4 mt-2 flex-wrap">
            {brands.map((item) => {
              return (
                <a
                  href={item.link}
                  className="text-white bg-brandRed py-2 px-4  rounded-sm text-sm mr-2 hover:scale-105"
                  key={item.name}
                  target="_blank"
                >
                  {item.name}
                </a>
              );
            })}
          </div>
        </div>
      </div>
      <div id="OurServices"></div>
    </div>
  );
}

/**
 * @param {{
 *   products: Promise<RecommendedProductsQuery>;
 * }}
 */

export function canvasArt() {
  return (
    <div className="absolute -right-4 top-[0%] -z-10 overflow-hidden h-[100vh] flex flex-col justify-center ">
      <div className="bg-[black] w-[150vw] h-2 -rotate-[5deg] mb-4"></div>
      <div className="bg-brandRed w-[150vw] h-2 -rotate-[5deg] mb-4"></div>
      <div className="bg-[black] w-[150vw] h-2 -rotate-[5deg] mb-4"></div>
      <div className="bg-brandRed w-[150vw] h-2 -rotate-[5deg] mb-4"></div>
      <div className="bg-[black] w-[150vw] h-2 -rotate-[5deg] mb-4"></div>
      <div className="bg-brandRed w-[150vw] h-2 -rotate-[5deg] mb-14"></div>
      <div className="bg-[black] w-[150vw] h-2 rotate-[5deg] mb-4"></div>
      <div className="bg-brandRed w-[150vw] h-2 rotate-[5deg] mb-4"></div>
      <div className="bg-[black] w-[150vw] h-2 rotate-[5deg] mb-4"></div>
      <div className="bg-brandRed w-[150vw] h-2 rotate-[5deg] mb-4"></div>
      <div className="bg-[black] w-[150vw] h-2 rotate-[5deg] mb-4"></div>
      <div className="bg-brandRed w-[150vw] h-2 rotate-[5deg] mb-4"></div>
    </div>
  );
}
export function RecommendedProducts({products}) {
  const [data, setdata] = useState([]);
  const carouselDiv = useRef();

  const moveRight = () => {
    console.log('right move', carouselDiv);
    carouselDiv.current.scrollLeft +=
      carouselDiv.current.scrollWidth / products.nodes.length;
  };
  const moveLeft = () => {
    carouselDiv.current.scrollLeft -=
      carouselDiv.current.scrollWidth / products.nodes.length;
  };
  // const slider = setInterval(() => {
  //   console.log('slider_____', runtrack);
  //   if (runtrack == true) {
  //     moveRight();
  //     if (
  //       carouselDiv.current.scrollLeft >=
  //       carouselDiv.current.scrollWidth - carouselDiv.current.clientWidth
  //     ) {
  //       carouselDiv.current.style.scrollBehavior = 'unset';
  //       carouselDiv.current.scrollLeft = 0;
  //       carouselDiv.current.style.scrollBehavior = 'smooth';
  //     }
  //   }
  // }, 5000);
  useEffect(() => {
    setdata((prev) => [...prev, ...products.nodes]);
    if (carouselDiv.current) {
      carouselDiv.current.scrollLeft = 200;
    }
  }, []);

  return (
    <div className="min-h-screen  my-4">
      <h2 className="text-3xl font-extrabold mt-[2em] text-center font-[PoppinsBold] text-black">
        Our Services
      </h2>

      <div className="text-center ">
        <p>Strategic Foundations:</p>
        <h2 className="font-bold text-xl text-brandRed">Content Solutions</h2>

        <h3 className="font-extrabold text-2xl">
          Hyper-Focused Development And Growth
        </h3>
        <p className="text-md my-2 mx-8">
          TANTV is the leading editorial and subscription streaming service
          catering to the Afraspora. Our Content Solutions offer a comprehensive
          approach to brand storytelling, combining deep category and creative
          expertise to craft custom, engaging, and platform-optimized content
          strategies.
        </p>
      </div>
      {/* background art */}
      <div className="relative overflow-hidden ">
        {canvasArt()}
        <Suspense fallback={<div>Loading...</div>}>
          <Await resolve={products}>
            <div
              ref={carouselDiv}
              className="flex  w-[100%] overflow-hidden items-center md:min-h-screen flex-nowrap transition-all relative"
            >
              {data.map(
                ({description, title, id, images, handle, priceRange}) => {
                  const {url} = images.nodes[0];
                  console.log(priceRange.minVariantPrice);
                  return (
                    <div
                      key={id}
                      className="min-w-[16em] backdrop-blur-sm bg-[#ffffffca] mx-3 shadow-[2px_2px_20px_#aaaaaa97]  rounded-md hover:scale-105 transition-all scale-y-95 z-10 "
                    >
                      <img
                        src={url}
                        alt="service image"
                        className="h-[15em] w-full object-cover"
                      />
                      <div className="px-4 relative py-3 ">
                        <h1 className="font-extrabold text-xl text-black line-clamp-1">
                          {title}
                        </h1>
                        <p className=" text-xs font-extralight text-ellipsis text-wrap line-clamp-3 h-12">
                          {description}
                        </p>
                        <Link
                          to={`/products/${handle
                            .split(' ')
                            .join('-')
                            .toLowerCase()}`}
                          className="bg-black text-brandRed text-md py-2 px-4 mt-2 rounded-full flex items-center justify-between"
                        >
                          SUBSCRIBE{' '}
                          <span className="flex">
                            {priceRange.minVariantPrice.amount}
                            {priceRange.minVariantPrice.currencyCode}
                            <HiArrowRight className="text-xl mx-1" />
                          </span>
                        </Link>
                      </div>
                    </div>
                  );
                },
              )}
            </div>
            <div className="absolute w-full min-h-screen bg-black">
              <div className="flex absolute -top-[50%] z-30 w-full justify-between">
                <button
                  onClick={moveLeft}
                  className=" bg-brandRed rounded-full py-4 px-1 text-black  hover:h-[6em] hover:w-[3em] rounded-l-none transition-all h-12"
                >
                  <HiArrowLeft className="text-xl mx-1" />
                </button>
                <button
                  className=" bg-brandRed rounded-full py-4 px-1 text-black hover:h-[6em] hover:w-[3em] rounded-r-none transition-all h-12"
                  onClick={moveRight}
                >
                  <HiArrowRight className="text-xl mx-1" />
                </button>
              </div>
            </div>
          </Await>
        </Suspense>
      </div>
    </div>
  );
}
const ClientSection = () => {
  var newsMedia = [
    {
      name: 'The Wall Street Journal',
      logo: img5,
    },
    {
      name: 'Comcast',
      logo: img2,
    },
    {
      name: 'The New York Times',
      logo: img3,
    },
    {
      name: 'Washignton Post',
      logo: img4,
    },
    {
      name: 'Mekay Foods',
      logo: img1,
    },
  ];

  return (
    <div className="  mb-4 grid justify-center">
      <h2
        className="text-3xl font-extrabold text-center font-[PoppinsBold] text-black"
        id="OurClients"
      >
        Our Clients
      </h2>
      <p className="mx-5 text-md text-center">
        At TANTV, our clients are our top priority. We offer fully customized
        and budget-friendly service packages designed just for you. With a
        customer-centric approach and a focus on development and growth, we are
        committed to exceeding your expectations. As a leading editorial and
        subscription streaming service, we cater to Africans and the
        multicultural global diaspora. Our mission is to advance the inclusion
        of these communities in American media by sharing their voices and
        telling compelling stories. Join us for a personalized and enriching
        experience at TANTV.
      </p>
      <div className="flex justify-center flex-wrap mt-6">
        {[...newsMedia, ...newsMedia.reverse()].map(({name, logo}) => {
          return (
            <div>
              <img src={logo} alt="logo" className="w-[10em] mx-4 " />
            </div>
          );
        })}
      </div>
    </div>
  );
};
const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
`;

const PRODUCT_QUERY = `#graphql
query Products {
  products(first: 20) {
    nodes {
      id
      createdAt
      title
      description
      images(first: 1) {
        nodes {
          url
        }
      }
      tags
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      handle
    }
  }
}`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('storefrontapi.generated').FeaturedCollectionFragment} FeaturedCollectionFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductsQuery} RecommendedProductsQuery */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
