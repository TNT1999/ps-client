import Head from 'next/head';
import { NextPage } from 'next';
import NavigationMenu from '@components/admin/navigation/NavigationMenu';
import Layout from '@components/common/Layout';
import { useEffect, useState, FunctionComponent } from 'react';
import axiosClient from '@utils/api';
import useAsyncEffect from 'use-async-effect';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon,
  SpinnerIcon,
  TrashIcon
} from '@assets/icons';
import Tooltip from '@components/common/Tooltip';
import Tippy from '@tippyjs/react';
import UserAvatar from '@components/common/Avatar';
import dayjs from '@utils/dayjs';
import ReactPaginate from 'react-paginate';

type Props = any;

const Loading: FunctionComponent<any> = () => {
  return (
    <div className="h-full w-full flex items-center justify-center bg-white select-none">
      <div className="flex items-center justify-center">
        <SpinnerIcon className="animate-spin mr-2" /> Loading...
      </div>
    </div>
  );
};

const items = [...Array(70).keys()];

const ListUserPage: NextPage<Props> = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [itemsPerPage] = useState(10);
  const [isPreLoading, setPreLoading] = useState(false);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);

  useAsyncEffect(async () => {
    setPreLoading(true);
    const result: any[] = await axiosClient.get('users');
    setUsers(result);
    setPreLoading(false);
  }, []);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(items.slice(itemOffset, endOffset) as any);
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  return (
    <Layout admin>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex justify-center overflow-auto md:h-[calc(100vh-4rem)] h-[calc(100vh-3.5rem)] bg-main">
        <div className="flex flex-row flex-1">
          <NavigationMenu />
          <div className="max-w-screen-xl flex-1 h-full max-h-full m-auto">
            {isPreLoading ? (
              <Loading />
            ) : (
              <div className="py-4">
                <div className="p-4">
                  <div className="flex items-center justify-between pb-4">
                    <div>
                      <h2 className="text-black font-medium text-xl">
                        Users List
                      </h2>
                      {/* <span className="text-xs">All products item</span> */}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex bg-white items-center p-2.5 rounded-full shadow-sm w-80">
                        <SearchIcon className="h-6 w-6 text-gray-400" />
                        <input
                          className="outline-none ml-2 block w-full"
                          type="text"
                          name=""
                          id=""
                          placeholder="Search..."
                        />
                      </div>
                      {/* <div className="lg:ml-40 ml-10 space-x-8 flex">
                        <button className="px-4 py-2.5 rounded-md text-white bg-[#0042e8] cursor-pointer flex justify-center items-center">
                          <PlusIcon className="mr-1 h-5 w-5 text-current" />
                          Add new Product
                        </button>
                      </div> */}
                    </div>
                  </div>
                  <div className="bg-white rounded-lg w-full">
                    <div className="p-2">
                      <div className="inline-block min-w-full rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                          <thead>
                            <tr>
                              <th className="px-5 py-3 bg-blue-50 text-left font-semibold text-gray-600 tracking-wider rounded-l-lg">
                                Name
                              </th>
                              <th className="px-5 py-3 bg-blue-50 text-left font-semibold text-gray-600 tracking-wider">
                                Email
                              </th>
                              <th className="px-5 py-3 bg-blue-50 text-left font-semibold text-gray-600 tracking-wider">
                                Create At
                              </th>
                              <th className="px-5 py-3 bg-blue-50 font-semibold text-gray-600 tracking-wider">
                                Status
                              </th>
                              <th className="px-5 py-3 bg-blue-50 text-right font-semibold text-gray-600 tracking-wider rounded-r-lg">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {users.map((user, index) => {
                              return (
                                <tr key={user.id}>
                                  <td className="px-5 py-5 border-b border-gray-200 bg-white">
                                    <div className="flex items-center flex-shrink-0">
                                      <UserAvatar name={user.name} />
                                      <div className="ml-5">{user.name}</div>
                                    </div>
                                  </td>
                                  <td className="px-5 py-5 border-b border-gray-200 bg-white">
                                    <p className="text-gray-900 whitespace-no-wrap text-left">
                                      {user.email}
                                    </p>
                                  </td>
                                  <td className="px-5 py-5 border-b border-gray-200 bg-white">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                      {dayjs(user.createdAt).format(
                                        'DD/MM/YYYY'
                                      )}
                                    </p>
                                  </td>
                                  <td className="px-5 py-5 border-b border-gray-200 bg-white">
                                    <div className="flex justify-center">
                                      <p className="whitespace-no-wrap bg-green-200 text-green-600 w-fit py-1 px-3 rounded-full text-xs">
                                        Active
                                      </p>
                                    </div>
                                  </td>
                                  <td className="px-5 py-5 border-b border-gray-200 bg-white">
                                    {/* <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                      <span
                                        aria-hidden
                                        className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                      ></span>
                                      <span className="relative">Active</span>
                                    </span> */}
                                    <div className="flex justify-end">
                                      {/* <span className="flex items-center text-[#616c7a]">
                                        <Tippy
                                          arrow={true}
                                          placement={'top'}
                                          content={<Tooltip text={'Open'} />}
                                          delay={100}
                                        >
                                          <span>
                                            <Link
                                              href={`/dien-thoai/${product.slug}`}
                                            >
                                              <a target="_blank">
                                                <ExternalLinkIcon className="h-5 w-5 text-gray-700 m-[0.4375rem] cursor-pointer" />
                                              </a>
                                            </Link>
                                          </span>
                                        </Tippy>
                                      </span> */}

                                      {/* <span className="flex items-center text-[#616c7a]">
                                        <Tippy
                                          arrow={true}
                                          placement={'top'}
                                          content={<Tooltip text={'Edit'} />}
                                          delay={100}
                                        >
                                          <span>
                                            <EditIcon
                                              className="h-5 w-5 text-gray-700 m-[0.4375rem] cursor-pointer"
                                              onClick={() =>
                                                router.push(
                                                  `/dashboard/product/${product.slug}`
                                                )
                                              }
                                            />
                                          </span>
                                        </Tippy>
                                      </span> */}
                                      <span className="flex items-center text-[#616c7a]">
                                        <Tippy
                                          arrow={true}
                                          placement={'top'}
                                          content={<Tooltip text={'Delete'} />}
                                          delay={100}
                                        >
                                          <span>
                                            <TrashIcon className="h-5 w-5 m-[0.4375rem] text-red-500 cursor-pointer" />
                                          </span>
                                        </Tippy>
                                      </span>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>

                        {/* <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                          <span className="text-xs xs:text-sm text-gray-900">
                            Showing 1 to 4 of 50 Entries
                          </span>
                          <div className="inline-flex mt-2 xs:mt-0">
                            <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
                              Prev
                            </button>
                            &nbsp; &nbsp;
                            <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
                              Next
                            </button>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                  <ReactPaginate
                    breakLabel="..."
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={pageCount}
                    className="flex justify-end h-10 font-medium rounded-full mt-4 select-none"
                    activeClassName="bg-[#189eff]"
                    activeLinkClassName="!text-white"
                    pageLinkClassName="w-full h-full flex items-center justify-center text-black"
                    previousLinkClassName="w-full h-full flex items-center justify-center text-black"
                    nextLinkClassName="w-full h-full flex items-center justify-center text-black"
                    breakClassName="w-10 block md:flex justify-center items-center cursor-pointer leading-5 transition duration-150 ease-in rounded-full text-base bg-white shadow-sm mr-1 !bg-transparent"
                    pageClassName="w-10 block md:flex justify-center items-center cursor-pointer leading-5 transition duration-150 ease-in rounded-full text-base bg-white shadow-sm mr-1 hover:bg-[#c1e7ff]"
                    previousClassName="w-10 block md:flex justify-center items-center cursor-pointer leading-5 transition duration-150 ease-in rounded-full text-base bg-white shadow-sm mr-1 !bg-transparent hover:bg-gray-500"
                    nextClassName="w-10 block md:flex justify-center items-center cursor-pointer leading-5 transition duration-150 ease-in rounded-full text-base bg-white shadow-sm mr-1 !bg-transparent hover:bg-gray-500"
                    renderOnZeroPageCount={() => null}
                    disabledClassName="opacity-30"
                    nextLabel={
                      <li>
                        <ChevronRightIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </li>
                    }
                    previousLabel={
                      <li>
                        <ChevronLeftIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </li>
                    }
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default ListUserPage;
