import axios from 'axios';
import { useState, useEffect } from 'react'
import {Link as NavLink} from 'react-router-dom'
import { Pagination, PaginationItem, Stack, ThemeProvider } from '@mui/material'
import theme from './theme';

import s from './App.module.scss'

const BASE_URL = 'https://hn.algolia.com/api/v1/search?'

const Paginator = (props: any) => {
  const [card, setCards] = useState<[]>([]);
  const [query, setQuery] = useState<string>('react');
  const [page, setPage] = useState<any>(parseInt(props.location?.split('=')[1] || 1));
  const [pageQty, setPageQty] = useState<number>(0);

  useEffect(() => {
    axios.get(BASE_URL + `query=${query}&page=${page - 1}`).then(
      ({data}) => {
        setCards(data.hits)
        setPageQty(data.nbPages)

        if(data.nbPages < page) {
          setPage(1)
          props.history.replace('/')
        }
      }
    )
  }, [query, page, props.history])

    return (
        <>
        <ThemeProvider theme={theme}>
        <Stack spacing={1}>
        <div className={s.pag}>
          {!!pageQty && (
          <Pagination
            count={pageQty}
            defaultPage={1}
            onChange={(_, num) => setPage(num)}
            // backgroun="#8100EF"
            className={s.pagination__arrow}
            page={page}
            showFirstButton
            showLastButton
            shape="rounded"
            renderItem={
                    (item) => (
                      <PaginationItem 
                        component={NavLink}
                        to={`/?page=${item.page}`}  
                        {...item}
                      />
                    )
                }
          />

          )}
          </div>
        </Stack>
        </ThemeProvider>
        </>
    )
}

export default Paginator;