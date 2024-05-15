// ProductListing.jsx
import AppsHeader from "@crema/components/AppsContainer/AppsHeader";
import { useGetDataApi } from "@crema/hooks/APIHooks";
import { Box, Grid, Hidden, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import AppsContent from "@crema/components/AppsContainer/AppsContent";
import AppsPagination from "@crema/components/AppsPagination";
import AppSearchBar from "@crema/components/AppSearchBar";
import AppGridContainer from "@crema/components/AppGridContainer";
import { Fonts } from "@crema/constants/AppEnums";
import AppCard from "@crema/components/AppCard";
import Slide from "@mui/material/Slide";
import ListingTable from "./ListingTable";
import FilterItem from "../../../../@crema/components/Inventory/FilterItem";
import { Button } from "@mui/base";
import FilterListIcon from "@mui/icons-material/FilterList";
const ProductListing = () => {
  const { messages } = useIntl();
  const [filterData, setFilterData] = useState({
    title: "",
    inStock: [],
    mrp: { start: 0, end: 30000 },
  });

  const [page, setPage] = useState(0);
  const [{ apiData, loading }, { setQueryParams }] = useGetDataApi(
    "/api/ecommerce/list",
    [],
    {},
    false
  );

  const { list, total } = apiData;

  const onPageChange = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    setQueryParams({ filterData, page });
  }, [filterData, page]);

  return (
    <>
      <Box
        component="h2"
        variant="h2"
        sx={{
          fontSize: 16,
          color: "text.primary",
          fontWeight: Fonts.SEMI_BOLD,
          mb: {
            xs: 2,
            lg: 4,
          },
        }}
      >
        {messages["sidebar.ecommerceAdmin.Inventory"]}
      </Box>
      <AppGridContainer spacing={7}>
        <Slide direction="right" in mountOnEnter unmountOnExit>
          <Grid item xs={12}>
            {" "}
            {/* Set to xs={12} to take full width */}
            <AppCard
              title={
                <AppsHeader>
                  <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    width={1}
                    justifyContent="space-between"
                  >
                    <AppSearchBar
                      iconPosition="right"
                      overlap={false}
                      onChange={(event) => onSearchOrder(event.target.value)}
                      placeholder={messages["common.searchHere"]}
                    />
                    

                    <Box display="flex" flexDirection="row" alignItems="center">
                      <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="flex-end"
                      >
                        <Hidden smDown>
                          <AppsPagination
                            rowsPerPage={10}
                            count={total}
                            page={page}
                            onPageChange={onPageChange}
                          />
                        </Hidden>
                      </Box>
                    </Box>
                  </Box>
                </AppsHeader>
              }
              headerStyle={{ p: 0 }}
              contentStyle={{ p: 0 }}
            >
              <AppsContent
                sx={{
                  paddingTop: 2.5,
                  paddingBottom: 2.5,
                }}
              >
                <ListingTable productData={list || []} loading={loading} />
        
              </AppsContent>
              <Hidden smUp>
                <AppsPagination
                  rowsPerPage={10}
                  count={total}
                  page={page}
                  onPageChange={onPageChange}
                />
              </Hidden>
            </AppCard>
          </Grid>
        </Slide>
        {/* <Slide direction="left" in mountOnEnter unmountOnExit>
          <Grid item xs={12} lg={3}>
            <FilterItem filterData={filterData} setFilterData={setFilterData} />
          </Grid>
        </Slide> */}
      </AppGridContainer>
    </>
  );
};

export default ProductListing;
