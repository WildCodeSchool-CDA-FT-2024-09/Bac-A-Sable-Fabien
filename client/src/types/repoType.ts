export type Repo = {
    id: string;
    name: string;
    url: string;
    status:
    {
        id: number;
        label: string;
    },
    langs: [
        {
            id: number;
            label: string;
        },
    ],
    isFavorite: boolean;
} | null;