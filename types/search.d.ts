import { InputProps as TaroInputProps } from '@tarojs/components/types/Input'
import { FC } from 'react'

export interface SearchProps extends TaroInputProps {}

declare const Search: FC<SearchProps>

export default Search
