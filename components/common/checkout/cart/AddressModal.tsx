import { useAppDispatch } from '@app/store';
import { Modal } from '@components/common/modal/Modal';
import {
  AddressType,
  AddressWithIdType,
  DistrictType,
  ProvinceType,
  WardType
} from '@types';
import classNames from 'classnames';
import { ChangeEvent, FunctionComponent, useEffect, useState } from 'react';
import { useUpdateEffect } from 'react-use';
import { default as Input } from '@components/common/auth/AuthInput';
import { isInteger } from '@utils/misc';
import { createAddress, updateAddress } from '@app/slice';
import isEmpty from 'lodash/isEmpty';
import useAsyncEffect from 'use-async-effect';

export enum MODE {
  EDIT,
  NEW
}

type Props = {
  onClose: () => void;
  mode: MODE;
  address?: AddressWithIdType;
};

const initNewAddress: AddressType = {
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
};

const AddressModal: FunctionComponent<Props> = ({ onClose, mode, address }) => {
  const dispatch = useAppDispatch();
  const [newAddress, setCreateAddress] = useState<AddressType>(initNewAddress);
  const [editAddress, setEditAddress] = useState<AddressWithIdType | undefined>(
    address
  );
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

  useAsyncEffect(async () => {
    if (mode === MODE.NEW) return;
    const getProvince = async () => {
      if (!editAddress?.provinceId) return;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/address/province`
      );
      const result = await response.json();
      setProvinces(result);
    };
    const getDistricts = async () => {
      if (!editAddress?.districtId) return;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/address/district?province_id=${editAddress?.provinceId}`
      );
      const result = await response.json();
      setDistricts(result.districts);
    };
    const getWards = async () => {
      if (editAddress?.wardCode === '') return;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/address/ward?district_id=${editAddress?.districtId}`
      );
      const result = await response.json();
      setWards(result);
    };
    await Promise.all([getProvince(), getDistricts(), getWards()]);
  }, []);

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
    if (mode === MODE.EDIT) return;
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
    if (
      (newAddress.districtId === -1 && MODE.NEW) ||
      (editAddress?.districtId === -1 && MODE.EDIT)
    )
      return;
    const getWards = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/address/ward?district_id=${
          MODE.EDIT ? editAddress?.districtId : newAddress.districtId
        }`
      );
      const result = await response.json();
      setWards(result);
    };
    getWards();
  }, [newAddress.districtId, editAddress?.districtId]);

  useUpdateEffect(() => {
    if (
      (newAddress.provinceId === -1 && MODE.NEW) ||
      (editAddress?.provinceId === -1 && MODE.EDIT)
    )
      return;
    const getDistricts = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/address/district?province_id=${
          MODE.EDIT ? editAddress?.provinceId : newAddress.provinceId
        }`
      );
      const result = await response.json();
      setDistricts(result.districts);
      setWards([]);
    };
    getDistricts();
  }, [newAddress.provinceId, editAddress?.provinceId]);

  const onChange = (e: ChangeEvent<any>) => {
    const value =
      e.target.type === 'checkbox'
        ? e.target.checked
        : e.target.type.startsWith('select')
        ? parseInt(e.target.value)
        : e.target.value;

    if (mode === MODE.EDIT && editAddress) {
      setEditAddress({
        ...editAddress,
        [e.target.name]: value
      });
    }
    setCreateAddress({
      ...newAddress,
      [e.target.name]: value
    });
    resetError();
  };

  const onChangeSelect = (e: ChangeEvent<any>) => {
    if (e.target.name === 'province') {
      const provinceId = parseInt(e.target.value);
      if (MODE.EDIT && editAddress) {
        setEditAddress({
          ...editAddress,
          province:
            provinces.find((province) => province.province_id == provinceId)
              ?.name || '',
          provinceId,
          district: '',
          districtId: -1,
          ward: '',
          wardCode: ''
        });
      } else {
        setCreateAddress({
          ...newAddress,
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
    }
    if (e.target.name === 'district') {
      const districtId = parseInt(e.target.value);
      if (MODE.EDIT && editAddress) {
        setEditAddress({
          ...editAddress,
          districtId,
          district:
            districts.find((district) => district.district_id == districtId)
              ?.name || '',
          wardCode: '',
          ward: ''
        });
      } else {
        setCreateAddress({
          ...newAddress,
          districtId,
          district:
            districts.find((district) => district.district_id == districtId)
              ?.name || '',
          wardCode: '',
          ward: ''
        });
      }
    }
    if (e.target.name === 'ward') {
      const wardCode = e.target.value;
      if (MODE.EDIT && editAddress) {
        setEditAddress({
          ...editAddress,
          wardCode,
          ward: wards.find((ward) => ward.WardCode === wardCode)?.WardName || ''
        });
      } else {
        setCreateAddress({
          ...newAddress,
          wardCode,
          ward: wards.find((ward) => ward.WardCode === wardCode)?.WardName || ''
        });
      }
    }
    resetError();
  };

  const handleSubmit = async () => {
    const newError = { ...error };

    if (
      (mode === MODE.EDIT && editAddress?.name === '') ||
      (mode === MODE.NEW && newAddress.name === '')
    ) {
      newError.name = 'Nhập tên';
    }
    if (
      (mode === MODE.EDIT && !isInteger(editAddress?.phone)) ||
      (mode === MODE.NEW && !isInteger(newAddress.phone))
    ) {
      newError.phone = 'Số điện thoại sai';
    }
    if (
      (mode === MODE.EDIT && editAddress?.phone === '') ||
      (mode === MODE.NEW && newAddress.phone === '')
    ) {
      newError.phone = 'Nhập số điện thoại';
    }
    if (
      (mode === MODE.EDIT && editAddress?.address === '') ||
      (mode === MODE.NEW && newAddress.address === '')
    ) {
      newError.address = 'Nhập địa chỉ';
    }
    if (
      (mode === MODE.EDIT && editAddress?.provinceId === -1) ||
      (mode === MODE.NEW && newAddress.provinceId === -1)
    ) {
      newError.province = 'Nhập Tỉnh/ Thành phố';
    }
    if (
      (mode === MODE.EDIT && editAddress?.districtId === -1) ||
      (mode === MODE.NEW && newAddress.districtId === -1)
    ) {
      newError.district = 'Nhập Quận huyện';
    }
    if (
      (mode === MODE.EDIT && editAddress?.wardCode === '') ||
      (mode === MODE.NEW && newAddress.wardCode === '')
    ) {
      newError.ward = 'Nhập Phường xã';
    }
    setError({ ...newError });
    if (Object.values(newError).some((error) => !isEmpty(error))) return;
    try {
      if (mode === MODE.NEW) {
        await dispatch(createAddress(newAddress));
        onClose();
      }
      if (mode === MODE.EDIT) {
        if (editAddress) await dispatch(updateAddress(editAddress));
        onClose();
      }
    } catch (e) {
      console.log(e);
    }
  };

  if (mode === MODE.EDIT && !editAddress) {
    return <div>Fail...</div>;
  }
  return (
    <Modal
      modalBackgroundColor="bg-white"
      containerClassName="p-5 animate-fadeInDown fixed top-[40px] max-h-[calc(100%-60px)] overflow-auto"
      shadow="shadow"
      rounded="rounded"
      width={832}
      onClose={onClose}
      className="bg-[#27272ab3]"
    >
      <div className="flex">
        <div className="bg-white rounded-lg flex-1">
          <div className="text-2xl font-normal mt-1 mb-6">
            {mode === MODE.NEW ? 'Tạo mới địa chỉ' : 'Chỉnh sửa địa chỉ'}
          </div>
          <div className="rounded bg-white">
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
                      value={
                        (mode === MODE.EDIT
                          ? editAddress?.name
                          : newAddress.name) || ''
                      }
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
                      value={
                        (mode === MODE.EDIT
                          ? editAddress?.phone
                          : newAddress.phone) || ''
                      }
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
                      value={
                        mode === MODE.EDIT
                          ? editAddress?.provinceId
                          : newAddress.provinceId
                      }
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
                            <option key={index} value={province.province_id}>
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
                      value={
                        mode === MODE.EDIT
                          ? editAddress?.districtId
                          : newAddress.districtId
                      }
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
                            <option key={index} value={district.district_id}>
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
                      value={
                        mode === MODE.EDIT
                          ? editAddress?.wardCode
                          : newAddress.wardCode
                      }
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
                      value={
                        mode === MODE.EDIT
                          ? editAddress?.address
                          : newAddress.address
                      }
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
                          checked={
                            mode === MODE.EDIT
                              ? editAddress?.addressType === 'home'
                              : newAddress.addressType === 'home'
                          }
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
                          checked={
                            mode === MODE.EDIT
                              ? editAddress?.addressType === 'company'
                              : newAddress.addressType === 'company'
                          }
                          className="h-5 w-5 border-gray-300 focus:ring-blue-300"
                        />
                        <span className="text-13 ml-2 block">
                          Cơ quan / Công ty
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
                {!address?.isDefault && (
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
                        checked={
                          mode === MODE.EDIT
                            ? editAddress?.isDefault
                            : newAddress.isDefault
                        }
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
                )}
              </div>
            </form>
          </div>

          <div className="flex text-center justify-end text-base mt-[24px] h-[36px]">
            <div
              className="mr-2 rounded cursor-pointer py-2 px-4 text-gray-600 border border-gray-400 hover:border-gray-500"
              onClick={onClose}
            >
              Huỷ
            </div>
            <div
              className="rounded cursor-pointer py-2 px-4 text-white bg-[#0b74e5]"
              onClick={handleSubmit}
            >
              Xác nhận
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddressModal;
