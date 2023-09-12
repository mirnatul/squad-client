import React from 'react';
import { useQuery } from '@tanstack/react-query';


const useBoard = () => {
    const { data: boards = [], refetch } = useQuery({
        queryKey: ['todos'],
        queryFn: async () => {
            const res = await fetch('https://squad-server.vercel.app/boards')
            return res.json();
        }
    })
    return [boards, refetch]
};

export default useBoard;