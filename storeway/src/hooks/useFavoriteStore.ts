import { useQuery } from "@tanstack/react-query";

const URL = 'https://kassal.app/api/v1/physical-stores/'

function useFavoriteStore(id: string){
    const useFavoriteQuery = useQuery({
        queryKey: ['store', id],
        queryFn: async () => {
            const data = await fetch(
                URL + id, {headers: {Authorization: 'Bearer eZPWuKmg1sPpchBhU4rsF6uAFICgyyBsHVs2Jaaw'}}
            ).then((res) => res.json());

            return data;
        },
    });

    return useFavoriteQuery;
}

export default useFavoriteStore;