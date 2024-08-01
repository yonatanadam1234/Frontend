import React, { useEffect, useState } from "react";
import AppsContainer from "@crema/components/AppsContainer";
import { useIntl } from "react-intl";
import {
  Hidden,
  Box,
} from "@mui/material";
import AppsHeader from "@crema/components/AppsContainer/AppsHeader";
import AppsContent from "@crema/components/AppsContainer/AppsContent";
import AppsPagination from "@crema/components/AppsPagination";
import AppSearchBar from "@crema/components/AppSearchBar";
import ShippingGropu from "./ShippingGroups";

const ShippingSetting = () => {
  const { messages } = useIntl();
  const [page, setPage] = useState(0);
  const [search, setSearchQuery] = useState("");
  const [ShippingGropuData, setShippingGropuData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  useEffect(() => {
    const dummyData = [
      {
        shipping_group_no: 1,
        urgency: 'Standard',
        postage_description: 'Small',
        royal_mail: 1.50,
        vhl: '-',
        parcel_force: '-',
        us1: '-',
        us2: '5.00',
        us3: '-', 
        fr1: '-',
        fr2: '-',
        fr3: '9.00',
      },
      {
        shipping_group_no: 2,
        urgency: 'Standard',
        postage_description: 'Medium',
        royal_mail: '-',
        vhl: '-',
        parcel_force: '4.50',
        us1: '5.50',
        us2: '-',
        us3: '-', 
        fr1: '-',
        fr2: '9.50',
        fr3: '-',
      },
      {
        shipping_group_no: 3,
        urgency: 'Standard',
        postage_description: 'Large',
        royal_mail: '-',
        vhl: '4.50',
        parcel_force: '-',
        us1: '6.50',
        us2: '-',
        us3: '-', 
        fr1: '-',
        fr2: '-',
        fr3: '11.50',
      },
      {
        shipping_group_no: 1,
        urgency: 'Expedited',
        postage_description: 'Small',
        royal_mail: 4.50,
        vhl: '-',
        parcel_force: '-',
        us1: '-',
        us2: '-',
        us3: '9.50', 
        fr1: '-',
        fr2: '11.50',
        fr3: '-',
      },
      {
        shipping_group_no: 2,
        urgency: 'Expedited',
        postage_description: 'Medium',
        royal_mail: '-',
        vhl: '-',
        parcel_force: '7.50',
        us1: '-',
        us2: '9.50',
        us3: '-', 
        fr1: '11.50',
        fr2: '-',
        fr3: '-',
      },
      {
        shipping_group_no: 3,
        urgency: 'Expedited',
        postage_description: 'Large',
        royal_mail: '-',
        vhl: '7.50',
        parcel_force: '-',
        us1: '-',
        us2: '10.50',
        us3: '-', 
        fr1: '-',
        fr2: '-',
        fr3: '14.50',
      },
      {
        shipping_group_no: 1,
        urgency: 'SecondDay',
        postage_description: 'Small',
        royal_mail: '-',
        vhl: '-',
        parcel_force: '9.50',
        us1: '-',
        us2: '-',
        us3: '12.50', 
        fr1: '-',
        fr2: '14.50',
        fr3: '-',
      },
      {
        shipping_group_no: 2,
        urgency: 'SecondDay',
        postage_description: 'Medium',
        royal_mail: 8.50,
        vhl: '-',
        parcel_force: '-',
        us1: '-',
        us2: '12.50',
        us3: '-', 
        fr1: '-',
        fr2: '-',
        fr3: '15.50',
      },
      {
        shipping_group_no: 3,
        urgency: 'SecondDay',
        postage_description: 'Large',
        royal_mail: '-',
        vhl: '10.50',
        parcel_force: '-',
        us1: '-',
        us2: '13.50',
        us3: '-', 
        fr1: '-',
        fr2: '-',
        fr3: '16.50',
      },
      {
        shipping_group_no: 1,
        urgency: 'NextDay',
        postage_description: 'Small',
        royal_mail: 10.50,
        vhl: '-',
        parcel_force: '-',
        us1: '-',
        us2: '-',
        us3: '15.50',
        fr1: '15.50',
        fr2: '-',
        fr3: '-',
      },
      {
        shipping_group_no: 2,
        urgency: 'NextDay',
        postage_description: 'Medium',
        royal_mail: '-',
        vhl: '12.50',
        parcel_force: '-',
        us1: '-',
        us2: '15.50',
        us3: '-', 
        fr1: '16.50',
        fr2: '-',
        fr3: '-',
      },
    ];     
    setShippingGropuData(dummyData);
  }, []);
                                                                                                                                              
  const onPageChange = (event, value) => {
    console.log('Page changed:', value);
    setPage(value);
  };
  
  const handleChangeRowsPerPage = (event) => {
    console.log('Rows per page changed:', event.target.value);
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const onSearchOrder = (value) => {
    setSearchQuery(value);
    setPage(0);
  };
  const filteredData = ShippingGropuData.filter((item) => {
    return item.shipping_group_no.toString().includes(search);
  });

  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );
  console.log('Paginated data:', paginatedData);

  return (
    <>
      <h1>Shipping Groups</h1>
      <Box display="flex" alignItems="center">
      </Box>
      <AppsContainer fullView>
        <AppsHeader>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            width={1}
          > 
            <AppSearchBar
              iconPosition="right"
              overlap={false}
              onChange={(event) => onSearchOrder(event.target.value)}
              placeholder={messages["common.searchHere"]}
            />
            <Box display="flex" flexDirection="row" alignItems="center" justifyContent="right" flex='auto'>
              
              <Hidden smDown>
                <AppsPagination
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={onPageChange}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </Hidden> 
            </Box>
            
          </Box>
        </AppsHeader>

        <AppsContent
          sx={{
            paddingTop: 2.5,
            paddingBottom: 2.5,
            overflowX: "auto",
          }}
        >
          <ShippingGropu ShippingGropuData={paginatedData}/>
        </AppsContent>

        <Hidden smUp>
          <AppsPagination
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={onPageChange}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Hidden> 
        
      </AppsContainer>
    </>
  );
};

export default ShippingSetting;