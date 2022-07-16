import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { Box, Grid } from "@mui/material";
import { useRouter } from "next/router";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { hooks } from "./connectors/coinbaseWallet";
import { AppContext } from "../components/state/context";
import { Avatar } from "@nextui-org/react";

const { useChainId, useAccounts, useIsActive } = hooks;

export default function Layout({ children }) {
  const session = useContext(AppContext);
  const router = useRouter();
  const accounts = useAccounts();
  const isActive = useIsActive();
  const chainId = useChainId();
  console.log("Session", session);
  return (
    <>
      <Navbar />
      <Grid container spacing={3} width="auto" padding="1vw">
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
          <Box
            border={1}
            borderRadius={3}
            justifyContent="space-around"
            width="90%"
            bgcolor="#140035"
          >
            <Box padding={2} overflow="true" fontSize="0.6rem" color="white">
              {session.state.token.accessToken !== "" ? (
                <b>{accounts}</b>
              ) : (
                <></>
              )}
              <br />
            </Box>
          </Box>
          <Box border={1} borderRadius={3} mt={2} width="90%">
            <Box
              padding={2}
              overflow="true"
              fontSize="0.8rem"
              bgcolor="#140035"
              borderRadius={3}
              color="white"
            >
              <Box display="flex" width="100%" justifyContent="space-around">
                {session.state.token.accessToken !== "" ? (
                  <>
                    <Avatar
                      squared
                      src={session.state.user.picture as string}
                      size="xl"
                    />
                    <Box width="50%" fontSize="0.8rem">
                      {session.state.user.name} <br />@
                      {session.state.user.handle}
                      <br />
                    </Box>
                  </>
                ) : (
                  <>Please sign In</>
                )}
              </Box>
            </Box>
          </Box>
          <Box mt={2} width="90%">
            <Box overflow="true" fontSize="1rem">
              <a
                onClick={() => {
                  router.push("/dashboard");
                }}
                style={{ color: "#140035", cursor: "pointer" }}
              >
                <ClearAllIcon />
                Dashboard
              </a>
            </Box>
            <Box overflow="true" fontSize="1rem">
              <a
                onClick={() => {
                  router.push("/pools");
                }}
                style={{ color: "#140035", cursor: "pointer" }}
              >
                <ClearAllIcon />
                All Pools
              </a>
            </Box>
            <Box overflow="true" fontSize="1rem">
              <a
                onClick={() => {
                  router.push("/address");
                }}
                style={{ color: "#140035", cursor: "pointer" }}
              >
                <ClearAllIcon />
                Search By Address
              </a>
            </Box>
            <Box overflow="true" fontSize="1rem">
              <a
                onClick={() => {
                  router.push("/asset");
                }}
                style={{ color: "#140035", cursor: "pointer" }}
              >
                <ClearAllIcon />
                Search By Asset
              </a>
            </Box>
          </Box>
        </Grid>

        <Grid height="85vh" item xs={12} sm={12} md={9} lg={9} xl={9}>
          {children}
        </Grid>
      </Grid>
    </>
  );
}
