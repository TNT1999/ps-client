import Head from 'next/head';
import { NextPage } from 'next';
import NavigationMenu from '@components/admin/navigation/NavigationMenu';
import Layout from '@components/common/Layout';
import ViewProductEditor from '@components/admin/editor/Editor';
import { useState, FunctionComponent } from 'react';
import axiosClient from '@utils/api';
import useAsyncEffect from 'use-async-effect';
import { SpinnerIcon } from '@assets/icons';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

type Props = any;

const LoadingIndicator: FunctionComponent<any> = () => {
  return (
    <div className="h-full w-full flex items-center justify-center bg-white select-none">
      <div className="flex items-center">
        <SpinnerIcon className="animate-spin mr-2" /> Loading...
      </div>
    </div>
  );
};
const ProductPage: NextPage<Props> = () => {
  const [brands, setBrands] = useState<any[]>([]);
  const [product, setProduct] = useState<any>();
  const [isPreLoading, setPreLoading] = useState(false);
  const router = useRouter();
  const slug = router.query.slug;

  useAsyncEffect(async () => {
    setPreLoading(true);
    const [initialProduct, initialBrands] = await Promise.all([
      axiosClient.get(`origin/product/${slug}`),
      axiosClient.get('brands')
    ]);
    setProduct(initialProduct);
    setBrands(initialBrands as unknown as any[]);

    setPreLoading(false);
  }, []);

  console.log(product);
  return (
    <Layout admin>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col h-full overflow-hidden pt-14">
        <div className="h-14 fixed bg-white inset-x-0 top-0 flex shadow-sm z-[100]"></div>
        <div className="flex flex-row flex-1 overflow-hidden">
          <NavigationMenu />
          {isPreLoading || !product ? (
            <LoadingIndicator />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-screen-xl flex-1 h-full max-h-full overflow-y-auto m-auto"
            >
              <ViewProductEditor
                brands={brands}
                initialProduct={product}
                method={'put'}
              />
            </motion.div>
          )}
        </div>
      </main>
    </Layout>
  );
};
export default ProductPage;
