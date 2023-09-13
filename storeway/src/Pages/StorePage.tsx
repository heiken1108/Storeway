import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Store } from "../lib/types";
import { useNavigate } from 'react-router-dom';
import './StorePage.css'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

export default function Storepage() {
  return (
    <QueryClientProvider client={queryClient}>
      <GetStore />
    </QueryClientProvider>
  );
}

const queryClient = new QueryClient();

function GetStore() {
  const { storeID } = useParams();
  const [store, setStore] = useState<Store | undefined>(undefined);
  const [URL, setURL] = useState(
    "https://kassal.app/api/v1/physical-stores/" + storeID
  );
  const navigate = useNavigate();

  const { isLoading, refetch } = useQuery({
    queryKey: ["Test"],
    queryFn: () =>
      fetch(URL, {
        headers: {
          Authorization: "Bearer eZPWuKmg1sPpchBhU4rsF6uAFICgyyBsHVs2Jaaw",
        },
      }).then((res) => res.json()),
    onSuccess: (rawData: any) => {
      const store: Store = {
        address: rawData.data.address,
        email: rawData.data.email,
        fax: rawData.data.fax,
        id: rawData.data.id,
        name: rawData.data.name,
        openingHours: rawData.data.openingHours,
        phone: rawData.data.phone,
        position: rawData.data.position,
        website: rawData.data.website,
        logo: rawData.data.logo,
      };
      setStore(store);
    },
  });

  useEffect(() => {
    refetch();
  }, [URL]);

  useEffect(() => {
    setURL("https://kassal.app/api/v1/physical-stores/" + storeID);
    console.log(store?.position)
  }, [storeID]);

  function handleStoreChange(direction: boolean) {
    if (direction) {
      let nextID: number;
      if (storeID) {
        nextID = Number(storeID) + 1;
        navigate("/store/" + nextID);
      }
    } else {
      let nextID: number;
      if (storeID) {
        nextID = Number(storeID) - 1;
        navigate("/store/" + nextID);
      }
    }
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div> {storeID} </div>
      <div> {store?.address} </div>
      <div> {store?.name} </div>
      <div> {store?.position.lat} </div>
      <div> {store?.position.lng} </div>
      <button onClick={() => handleStoreChange(false)}> Forrige Butikk </button>
      <button onClick={() => handleStoreChange(true)}> Neste Butikk</button>
    </>
  );
}
