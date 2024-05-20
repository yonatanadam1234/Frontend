// ProductListing.jsx
import AppsHeader from "@crema/components/AppsContainer/AppsHeader";
import { useGetDataApi } from "@crema/hooks/APIHooks";
import {
  Box,
  Checkbox,
  Drawer,
  FormControlLabel,
  FormGroup,
  Grid,
  Hidden,
  IconButton,
  InputLabel,
} from "@mui/material";
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
import { Button, FormControl, MenuItem, Select } from "@mui/base";
import FilterListIcon from "@mui/icons-material/FilterList";
import { IoCloseSharp } from "react-icons/io5";
import { padding } from "@mui/system";
import { yellow } from "@mui/material/colors";
const ProductListing = () => {
  const { messages } = useIntl();
  const [filterData, setFilterData] = useState({
    title: "",
    inStock: [],
    mrp: { start: 0, end: 30000 },
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const toggleFilterDrawer = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  const applyFilters = () => {
    console.log("Applied Filters:", filters);
  };

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
                    <Box
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      justifyContent="right"
                      flex="auto"
                    >
                      <IconButton color="primary" onClick={toggleFilterDrawer}>
                        <Button
                         style={{
                          padding:'8px 20px',
                          margin:'10px 0px',
                          background:'#0A8FDC',
                          color:'#FFF',
                          borderRadius:'10px',
                          border:'none',
                          display:'flex',
                          alignItems:'center'
                        }}
                        >
                          <FilterListIcon />
                          &nbsp;&nbsp;Filters
                        </Button>
                      </IconButton>
                      
                    </Box>

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


        
        <Drawer anchor="right" open={isFilterOpen} onClose={toggleFilterDrawer} fullWidth>
          <Box style={{
            width:'100%',
            display:'flex',
            justifyContent:'flex-end',
            marginRight:'300px',
          }}>
            <IoCloseSharp style={{fontSize:'38px',marginRight:'10px',}} onClick={toggleFilterDrawer}/>
          </Box>
          <Box p={10}>
            <FormControl
              fullWidth
              sx={{
                paddingBottom: 5,
              }}
            >
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Top-Selling"
                />
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Less Popular Products."
                />
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Recently Sold"
                />
              </FormGroup>
              
            </FormControl>
            {/* Add more filter options */}
            
            <Button
              onClick={applyFilters}
            style={{
              padding:'12px 25px',
              margin:'10px 0px',
              background:'#0A8FDC',
              color:'#FFF',
              borderRadius:'10px',
              border:'none'
            }}
            >
              Apply Filters
            </Button>
          </Box>
        </Drawer>
      </AppGridContainer>
    </>
  );
};

export default ProductListing;
