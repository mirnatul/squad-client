import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';


const useTask = () => {
    const { id } = useParams()

    const { data: tasks = [], refetch } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const res = await fetch(`https://squad-server.vercel.app/tasks/${id}`)
            return res.json();
        }
    })
    return [tasks, refetch]
};

export default useTask;