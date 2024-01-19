import {defer} from '@shopify/remix-oxygen';
import {Await, useLoaderData} from '@remix-run/react';
import {HiArrowRight, HiArrowLeft} from 'react-icons/hi';
import hero1 from '../assets/AdedayoHS4.jpg';
import hero2 from '../assets/BOMESI1.jpg';
import hero3 from '../assets/BOMESI-058.jpg';
import {FaArrowRightLong} from 'react-icons/fa6';
import {Suspense, useEffect, useRef, useState} from 'react';
/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [{title: 'TANTV BRANDZ | Home'}];
};

/**
 * @param {LoaderFunctionArgs}
 */
export async function loader({context}) {
  const {storefront} = context;
  const data = await storefront.query(PRODUCT_QUERY);
  return data;
}

export default function Homepage() {
  /** @type {LoaderReturnData} */
  const data = useLoaderData();
  return (
    <div className="">
      <LandingMain />
      <RecommendedProducts products={data.products} />
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
          <h1 className="text-[3em] font-extrabold leading-[1em]">
            <span className=" hidden  text-[2em] absolute z-[-29] -top-2 text-[#f9b6b3]">
              TANTV
            </span>{' '}
            The Digital
            <br /> Home of the <span className="text-brandRed">
              African
            </span>{' '}
            Diaspora.
          </h1>
        </div>
        <p>
          Explore a rich tapestry of African and multicultural content that
          informs, inspires, and entertains.
        </p>
        <div className="flex">
          <button className="text-sm md:text-xl bg-black  rounded-full py-3 text-white w-fit my-4 mr-1 hover:scale-105 transition-all flex items-center justify-center pr-12 pl-4 relative border-2 border-black hover:bg-white hover:text-black font-semibold">
            Start Exploring
            <FaArrowRightLong className="bg-white ml-2 rounded-full text-black px-2 py-2 text-4xl absolute right-2 border-2 border-black" />
          </button>
          <button className="ml-2 text-sm md:text-xl bg-brandRed px-10 rounded-full  py-3 text-white w-fit my-4 hover:scale-105 transition-all flex items-center justify-center relative border-2 border-brandRed hover:bg-white hover:text-brandRed font-semibold">
            Join Us
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * @param {{
 *   products: Promise<RecommendedProductsQuery>;
 * }}
 */
function RecommendedProducts({products}) {
  const [data, setdata] = useState([]);
  const [runtrack, setruntrack] = useState(true);
  const carouselDiv = useRef();
  
  const moveRight = () => {
    carouselDiv.current.scrollLeft +=
      carouselDiv.current.scrollLeftMax / (products.nodes.length * 2);
  };
    const moveLeft= () => {
      carouselDiv.current.scrollLeft -=
        carouselDiv.current.scrollLeftMax / (products.nodes.length * 2);
    };
  const slider = setInterval(() => {
    if (runtrack == true) {
      moveRight();
      if (
        carouselDiv.current.scrollLeft >=
        carouselDiv.current.scrollWidth - carouselDiv.current.clientWidth
      ) {
        carouselDiv.current.style.scrollBehavior = 'unset';
        carouselDiv.current.scrollLeft = 0;
        carouselDiv.current.style.scrollBehavior = 'smooth';
      }
    }
  }, 3000);
  useEffect(() => {
    setdata((prev) => [...prev, ...products.nodes, ...products.nodes]);
    if (carouselDiv.current) {
      carouselDiv.current.scrollLeft = 0;
    }

    return clearInterval(slider);
  }, [runtrack]);
  return (
    <div className="min-h-screen  my-4">
      <h2 className="text-3xl font-extrabold mt-[2em] text-center">
        Our Services
      </h2>
      <div className="text-center">
        <p>
          Get fully customised and personalised service packages that suit your
          wallet
        </p>
        <h2 className="font-bold text-xl text-brandRed">
          Our Customer-Centric Approach
        </h2>
        <h3 className="font-extrabold text-2xl">
          Hyper-Focused Development And Growth
        </h3>
        <p className="text-sm my-2 mx-8">
          TANTV is the leading editorial and subscription streaming service
          catering to the Africans and multicultural global diaspora. Our
          mission is to advance the inclusion of African and multicultural
          diaspora communities in American media; we are doing this by
          aggregating diaspora voices, and telling stories that inform, inspire,
          engage and entertain.
        </p>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          <div
            ref={carouselDiv}
            className="flex  mt-8 w-[100%] overflow-hidden py-12 flex-nowrap transition-all relative"
          >
            {data.map(({description, title, id, images}) => {
              const {url} = images.nodes[0];
              return (
                <div
                  key={id}
                  className="min-w-[20em] bg-white mx-2 shadow-2xl  rounded-md hover:scale-105 transition-all scale-y-95"
                >
                  <img
                    src={url}
                    alt="service image"
                    className="h-[15em] w-full object-cover"
                  />
                  <div className="px-4 relative py-3 ">
                    <h1 className="font-extrabold text-xl text-brandRed line-clamp-1">
                      {title}
                    </h1>
                    <p className=" text-xs font-extralight text-ellipsis text-wrap line-clamp-3 h-12">
                      {description}
                    </p>
                    <button className="bg-black text-brandRed text-sm py-2 px-4 mt-2 rounded-full flex items-center">
                      READ MORE
                      <HiArrowRight className="text-xl mx-1" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="relative min-h-screen">
            <div className="flex absolute -top-[50%] z-30 w-full justify-between">
              <button
                onClick={moveRight}
                className=" bg-black rounded-full py-2 px-1 text-brandRed  hover:h-[6em] hover:w-[3em] rounded-l-none"
              >
                <HiArrowLeft className="text-xl mx-1" />
              </button>
              <button
                className=" bg-black rounded-full py-2 px-1 text-brandRed hover:h-[6em] hover:w-[3em] rounded-r-none"
                onClick={moveRight}
                onMouseEnter={() => {
                  setruntrack((prev) => !prev);
                  clearInterval(slider);
                }}
              >
                <HiArrowRight className="text-xl mx-1" />
              </button>
            </div>
          </div>
        </Await>
      </Suspense>
    </div>
  );
}

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
  products(first: 5) {
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
    }
  }
}`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('storefrontapi.generated').FeaturedCollectionFragment} FeaturedCollectionFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductsQuery} RecommendedProductsQuery */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
