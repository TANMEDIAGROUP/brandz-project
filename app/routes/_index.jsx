import {defer} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link} from '@remix-run/react';
import hero1 from '../assets/AdedayoHS4.jpg';
import hero2 from '../assets/BOMESI1.jpg';
import hero3 from '../assets/BOMESI-058.jpg';
import {FaArrowRightLong} from 'react-icons/fa6';
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
  const {collections} = await storefront.query(FEATURED_COLLECTION_QUERY);
  const featuredCollection = collections.nodes[0];
  const recommendedProducts = storefront.query(RECOMMENDED_PRODUCTS_QUERY);

  return defer({featuredCollection, recommendedProducts});
}

export default function Homepage() {
  /** @type {LoaderReturnData} */
  const data = useLoaderData();
  return (
    <div className="">
      <LandingMain />
      <RecommendedProducts products={data.recommendedProducts} />
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
          <button className="text-sm md:text-xl bg-brandRed px-10 rounded-full  py-3 text-white w-fit my-4 hover:scale-105 transition-all flex items-center justify-center relative border-2 border-brandRed hover:bg-white hover:text-brandRed font-semibold">
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
  return (
    <div className="min-h-screen ml-5">
      <h2 className="text-2xl font-bold ">Recommended Products</h2>
      {/* <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {({products}) => (
            <div className="recommended-products-grid">
              {products.nodes.map((product) => (
                <Link
                  key={product.id}
                  className="recommended-product"
                  to={`/products/${product.handle}`}
                >
                  <Image
                    data={product.images.nodes[0]}
                    aspectRatio="1/1"
                    sizes="(min-width: 45em) 20vw, 50vw"
                  />
                  <h4>{product.title}</h4>
                  <small>
                    <Money data={product.priceRange.minVariantPrice} />
                  </small>
                </Link>
              ))}
            </div>
          )}
        </Await>
      </Suspense>
      <br /> */}
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

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 1) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('storefrontapi.generated').FeaturedCollectionFragment} FeaturedCollectionFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductsQuery} RecommendedProductsQuery */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
