import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "src/redux/store";
import { createModelState } from "src/redux/actions/ModelActions";
import { DeviceManagementGrid } from "../components/DeviceManagementGrid";
import { deviceListApi } from "../utils/helpers";
import { AgGridApp } from "src/components/reusable/AgGrid";
import { AgGridReact } from "@ag-grid-community/react";
import { CustomBadge } from "src/components/reusable/Badge";
import "./dummy.css";

export const DeviceList: FC = React.memo(() => {
  const { t } = useTranslation();
  const modelState: any = useSelector((state: AppState) => state.MODEL);
  const { devices } = modelState;

  useEffect(() => {
    deviceListApi();
  }, []);
  console.log("devices", devices);

  var cellClassRules = {
    "header-cell": 'data.section === "big-title"',
  };

  const deviceStatus = (params: any) => {
    console.log("params", params);
    const getBadgeColor = () => {
      switch (params.node.data.connectionStatus) {
        case t("connected"):
          return "success";
        case t("disconnected"):
          return "danger";
        case undefined:
          return "secondary";
        // default:
        //   console.log("not exist", params.node.data.connectionStatus);
      }
    };
    return params.value === "Enabled Devices" ? (
      <div className="bg-red">dckwjdwjfe</div>
    ) : (
      <div>
        <p className="mb-n3 pb-0">{params.value}</p>
        <CustomBadge
          id="service-status"
          label={params.node.data.connectionStatus}
          color={getBadgeColor()}
          otherProps={{ className: "rounded-pill p-1" }}
        />
      </div>
    );
  };

  var columnDefs = [
    {
      headerName: "Device Name",
      field: "deviceName",
      colSpan: function (params: any) {
        if (isHeaderRow(params)) {
          return 6;
        } else {
          return 1;
        }
      },
      cellClassRules: cellClassRules,
      cellRenderer: deviceStatus,
      // cellStyle: { fontWeight: "bold" },
      // cellClass: "bg-primary",
    },
    { headerName: "Department", field: "deviceType" },
    { headerName: "Device Type", field: "deviceType" },
    { headerName: "Device Auth", field: "deviceType" },
  ];

  function isHeaderRow(params: any) {
    return params.data.section === "big-title";
  }

  let rowData: any;
  if (devices) {
    rowData = [
      { section: "big-title", deviceName: "Enabled Devices" },
      ...devices,
    ];
    const index = rowData.findIndex(
      (data: any) => data.deviceName === "test123"
    );
    // rowData.splice(index , 0, {});
    rowData.splice(index, 0, {
      section: "big-title",
      deviceName: "Disabled Devices",
    });
    rowData.splice(index, 0, {});
    rowData.push({});
    //In actual get index of the first disabled device in the above rowData by findIndex and then at that place simply insert another section for disabled
  }

  // function getRowHeight(params: any) {
  //   return isHeaderRow(params) ? 40 : 25;
  // }

  // const defaultColDef = {
  //   width: 100,
  // };
  // function onGridReady(params: any) {
  //   params.api.sizeColumnsToFit();
  // }

  return (
    <AgGridApp
      rowData={rowData}
      columnDefs={columnDefs}
      rowHeight={50}
      // getRowHeight={getRowHeight}
      // defaultColDef={defaultColDef}
      // onGridReady={onGridReady}
    />
  );
});

//This will give the device status (whether the device is connected or not)
// const deviceStatus = await axios.get(
//   `interfacing/get-device-status/?labId=${deviceList.data[0].labId}`
// );

//for device auth => /getDeviceNameAuth/?deviceId=3083
//Currently on UAT but not coming on local

//no api to know the enable disbale status of device.

//




//dummy.css

// .header-cell {
//   background-color: #a6e1ec;
//   font-size: 25px;
//   font-weight: bold;
//   text-align: center;
// }
// .quarters-cell {
//   background-color: #5bc0de;
//   font-weight: bold;
// }

