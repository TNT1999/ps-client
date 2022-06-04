import { PlusIcon } from '@assets/icons';
import Breadcrumb from '@components/breadcrumb';
import Divider from '@components/common/Divider';
import Layout from '@components/common/Layout';
import SideBar from '@components/common/user/SideBar';
import isEmpty from 'lodash/isEmpty';
import { NextPage } from 'next';
import Head from 'next/head';
import { ChangeEvent, useState, useEffect } from 'react';
import { default as Input } from '@components/common/auth/AuthInput';
import Button from '@components/common/Button';
import classNames from 'classnames';
import { AddressType, DistrictType, ProvinceType, WardType } from '@types';
import { useUpdateEffect } from 'react-use';
import { useAppDispatch } from '@app/store';
import { createAddress } from '@app/slice';
import { isInteger } from '@utils/misc';
import { useRouter } from 'next/router';
type Props = any;

const CreateAddressPage: NextPage<Props> = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [address, setAddress] = useState<AddressType>({
    phone: '',
    name: '',
    provinceId: -1,
    province: '',
    districtId: -1,
    district: '',
    wardCode: '',
    ward: '',
    address: '',
    isDefault: false,
    addressType: 'home'
  });

  const [error, setError] = useState({
    name: '',
    address: '',
    phone: '',
    province: '',
    district: '',
    ward: ''
  });

  const [provinces, setProvinces] = useState<ProvinceType[]>([]);
  const [districts, setDistricts] = useState<DistrictType[]>([]);
  const [wards, setWards] = useState<WardType[]>([]);

  const resetError = () => {
    setError({
      name: '',
      address: '',
      phone: '',
      province: '',
      district: '',
      ward: ''
    });
  };
  useEffect(() => {
    const getProvince = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/address/province`
      );
      const result = await response.json();
      setProvinces(result);
      setDistricts([]);
      setWards([]);
    };
    getProvince();
  }, []);

  useUpdateEffect(() => {
    if (address.districtId === -1) return;
    const getWards = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/address/ward?district_id=${address.districtId}`
      );
      const result = await response.json();
      setWards(result);
    };
    getWards();
  }, [address.districtId]);

  useUpdateEffect(() => {
    if (address.provinceId === -1) return;
    const getDistricts = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/address/district?province_id=${address.provinceId}`
      );
      const result = await response.json();
      setDistricts(result.districts);
      setWards([]);
    };
    getDistricts();
  }, [address.provinceId]);

  const onChange = (e: ChangeEvent<any>) => {
    const value =
      e.target.type === 'checkbox'
        ? e.target.checked
        : e.target.type.startsWith('select')
        ? parseInt(e.target.value)
        : e.target.value;
    setAddress({
      ...address,
      [e.target.name]: value
    });
    resetError();
  };

  const onChangeSelect = (e: ChangeEvent<any>) => {
    if (e.target.name === 'province') {
      const provinceId = parseInt(e.target.value);
      setAddress({
        ...address,
        province:
          provinces.find((province) => province.province_id == provinceId)
            ?.name || '',
        provinceId,
        district: '',
        districtId: -1,
        ward: '',
        wardCode: ''
      });
    }
    if (e.target.name === 'district') {
      const districtId = parseInt(e.target.value);
      setAddress({
        ...address,
        district:
          districts.find((district) => district.district_id == districtId)
            ?.name || '',
        districtId,
        ward: '',
        wardCode: ''
      });
    }
    if (e.target.name === 'ward') {
      const wardCode = e.target.value;
      setAddress({
        ...address,
        ward: wards.find((ward) => ward.WardCode === wardCode)?.WardName || '',
        wardCode
      });
    }
    resetError();
  };
  const handleSubmit = async () => {
    const newError = { ...error };

    if (address.name === '') {
      newError.name = 'Nhập tên';
    }
    if (!isInteger(address.phone)) {
      newError.phone = 'Số điện thoại sai';
    }
    if (address.phone === '') {
      newError.phone = 'Nhập số điện thoại';
    }
    if (address.address === '') {
      newError.address = 'Nhập địa chỉ';
    }
    if (address.provinceId === -1) {
      newError.province = 'Nhập Tỉnh/ Thành phố';
    }
    if (address.districtId === -1) {
      newError.district = 'Nhập Quận huyện';
    }
    if (address.wardCode === '') {
      newError.ward = 'Nhập Phường xã';
    }
    setError({ ...newError });
    if (Object.values(newError).some((error) => !isEmpty(error))) return;
    try {
      await dispatch(createAddress(address));
      router.push('/user/address');
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Layout>
      <Head>
        <title>Địa chỉ của tôi</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex justify-center overflow-auto h-main bg-main">
        <div className="max-w-screen-xl w-full px-4">
          <div className="p-4 justify-center flex-col flex gap-x-4">
            <Breadcrumb
              breadcrumbs={[
                { value: 'Trang chủ', href: '/dien-thoai' },
                { value: 'Địa chỉ của tôi', href: '/address' }
              ]}
            />
            <Divider className="mt-0 mb-4" />
          </div>
          <div className="flex">
            <SideBar />
            <div className="flex-1">
              <div className="text-2xl font-light mt-1 mb-4">
                Tạo mới địa chỉ
              </div>
              <div className="rounded bg-white py-9 px-6">
                <form className="flex space-x-8">
                  <div className="flex-1">
                    <div className="flex items-center mb-8">
                      <label
                        htmlFor="name"
                        className="text-base mr-4 text-[#333333] min-w-[110px] w-[110px]"
                      >
                        Họ và tên:{' '}
                      </label>
                      <div className="flex-1">
                        <Input
                          id="name"
                          name="name"
                          value={address.name || ''}
                          onChange={onChange}
                          inputClassName="!h-10 !mt-0"
                          placeholder="Nhập họ và tên"
                          isError={error.name !== ''}
                          message={error.name}
                        />
                      </div>
                    </div>
                    <div className="flex items-center mb-8">
                      <label
                        htmlFor="phone"
                        className="text-base mr-4 text-[#333333] min-w-[110px] w-[110px]"
                      >
                        Số điện thoại:{' '}
                      </label>
                      <div className="flex-1">
                        <Input
                          id="phone"
                          name="phone"
                          value={address.phone || ''}
                          onChange={onChange}
                          inputClassName="!h-10 !mt-0"
                          placeholder="Nhập số điện thoại"
                          isError={error.phone !== ''}
                          message={error.phone}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center mb-8">
                      <label
                        htmlFor="province"
                        className="text-base mr-4 text-[#333333] min-w-[110px] w-[110px]"
                      >
                        Tỉnh/Thành phố:{' '}
                      </label>
                      <div className="flex-1">
                        <select
                          id="province"
                          name="province"
                          value={address.provinceId}
                          className={classNames(
                            'px-4 h-10 mt-0 w-full block border text-gray-900 rounded focus:outline-none',
                            {
                              'border-red-400 focus:border-primary':
                                error.province !== '',
                              'border-gray-300': error.province === ''
                            }
                          )}
                          onChange={onChangeSelect}
                        >
                          <option value={-1}>Chọn Tỉnh/ Thành phố</option>
                          {provinces &&
                            provinces.map((province, index) => {
                              return (
                                <option
                                  key={index}
                                  value={province.province_id}
                                >
                                  {province.name}
                                </option>
                              );
                            })}
                        </select>
                        {error.province !== '' && (
                          <div className="text-red-400 text-sm ml-1">
                            {error.province}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center mb-8">
                      <label
                        htmlFor="district"
                        className="text-base mr-4 text-[#333333] min-w-[110px] w-[110px]"
                      >
                        Quận huyện:{' '}
                      </label>
                      <div className="flex-1">
                        <select
                          id="district"
                          name="district"
                          value={address.districtId}
                          className={classNames(
                            'px-4 h-10 mt-0 w-full block border text-gray-900 rounded focus:outline-none',
                            {
                              'border-red-400 focus:border-primary':
                                error.district !== '',
                              'border-gray-300': error.district === ''
                            }
                          )}
                          onChange={onChangeSelect}
                        >
                          <option value={-1}>Chọn Quận huyện</option>
                          {districts &&
                            districts.map((district, index) => {
                              return (
                                <option
                                  key={index}
                                  value={district.district_id}
                                >
                                  {district.name}
                                </option>
                              );
                            })}
                        </select>
                        {error.district !== '' && (
                          <div className="text-red-400 text-sm ml-1">
                            {error.district}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center mb-8">
                      <label
                        htmlFor="ward"
                        className="text-base mr-4 text-[#333333] min-w-[110px] w-[110px]"
                      >
                        Phường xã:{' '}
                      </label>
                      <div className="flex-1">
                        <select
                          id="ward"
                          name="ward"
                          value={address.wardCode}
                          className={classNames(
                            'px-4 h-10 mt-0 w-full block border text-gray-900 rounded focus:outline-none',
                            {
                              'border-red-400 focus:border-primary':
                                error.ward !== '',
                              'border-gray-300': error.ward === ''
                            }
                          )}
                          onChange={onChangeSelect}
                        >
                          <option value={''}>Chọn Phường xã</option>
                          {wards &&
                            wards.map((ward, index) => {
                              return (
                                <option key={index} value={ward.WardCode}>
                                  {ward.WardName}
                                </option>
                              );
                            })}
                        </select>
                        {error.ward !== '' && (
                          <div className="text-red-400 text-sm ml-1">
                            {error.ward}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center mb-8">
                      <label
                        htmlFor="address"
                        className="self-start text-base mr-4 text-[#333333] min-w-[110px] w-[110px]"
                      >
                        Địa chỉ:{' '}
                      </label>
                      <div className="flex-1">
                        <textarea
                          id="address"
                          rows={3}
                          name="address"
                          className={classNames(
                            'block p-2.5 w-full text-gray-900 rounded border focus:outline-none focus:border-primary',
                            {
                              'border-red-400': error.address !== '',
                              'border-gray-300': error.address === ''
                            }
                          )}
                          placeholder="Nhập địa chỉ..."
                          onChange={onChange}
                          value={address.address}
                        />
                        {error.address !== '' && (
                          <div className="text-red-400 text-sm ml-1">
                            {error.address}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center mb-8">
                      <div className="flex items-center flex-1">
                        <label className="text-base mr-4 text-[#333333] min-w-[110px] w-[110px]">
                          Loại địa chỉ:{' '}
                        </label>
                        <div className="flex-1 flex">
                          <label className="flex items-center mr-4">
                            <input
                              type="radio"
                              name="addressType"
                              value="home"
                              onChange={onChange}
                              checked={address.addressType === 'home'}
                              className="h-5 w-5 border-gray-300 focus:ring-blue-300"
                            />
                            <span className="text-13 ml-2 block">
                              Nhà riêng / Chung cư
                            </span>
                          </label>

                          <label className="flex items-center mr-4">
                            <input
                              type="radio"
                              name="addressType"
                              value="company"
                              onChange={onChange}
                              checked={address.addressType === 'company'}
                              className="h-5 w-5 border-gray-300 focus:ring-blue-300"
                            />
                            <span className="text-13 ml-2 block">
                              Cơ quan / Công ty
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center mb-8">
                      <label className="self-start text-base mr-4 text-[#333333] min-w-[110px] w-[110px]">
                        &nbsp;
                      </label>
                      <div className="flex items-center select-none">
                        <input
                          id="default"
                          type="checkbox"
                          name="isDefault"
                          className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                          checked={address.isDefault}
                          onChange={onChange}
                        />
                        <label
                          htmlFor="default"
                          className="text-base ml-4 text-[#333333]"
                        >
                          Đặt làm địa chỉ mặc định
                        </label>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="flex justify-end">
                  <Button
                    className="flex items-center justify-center py-1 text-white border-px bg-[#0b74e5]"
                    onClick={handleSubmit}
                  >
                    <PlusIcon className="mr-2" />
                    Thêm
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};
export default CreateAddressPage;
