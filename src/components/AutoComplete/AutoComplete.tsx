import { useState, useCallback, useRef } from "react"

import { AutoCompleteList } from "./AutoCompleteList"

import styles from "./AutoComplete.module.scss"

interface AutoCompleteProps {
  list: string[]
  placeholder?: string
}
export function AutoComplete({ list, placeholder = "Search me" }: AutoCompleteProps) {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(0)
  const [filteredOptions, setFilteredOptions] = useState<string[]>([])
  const listInput = useRef<HTMLInputElement>(null)

  const filterList = useCallback((myList: string[], input: string) => 
    new Promise<string[]>(
      (resolve) => {
        const newList = myList.filter(
          (listItem) => listItem.toLowerCase().includes(input.toLowerCase())
        )
  
        setTimeout(() => {
          resolve(newList)
        }, 100) 
      }
    ),[list])
    
  const handleChange = useCallback(changeFilter, [list])
  
  const handleInputResultsStyling = useCallback(hasResults, [filteredOptions])

  async function changeFilter() {
    const input = listInput?.current?.value
    if(input){
      const filteredList = await filterList(list,input)
      setFilteredOptions(filteredList)
      setSearchTerm(input)
    } else {
      setFilteredOptions([])
      setSearchTerm("")
    }
  }

  function hasResults() {
    return filteredOptions.length > 0
  }

  function handleClick(e : React.MouseEvent<HTMLLIElement, MouseEvent>) {
    const listItem = e?.target as HTMLLIElement
    const mySearchedValue = listItem.getAttribute("data-name")
    const item = filteredOptions.filter((listItem) =>  listItem === mySearchedValue)
    if(item?.length > 0) {
      const myListItem = item[0]
      changeInputValueAndClear(myListItem)
    }
  }

  function changeInputValueAndClear(value: string) {
    const input = listInput?.current
    if(input) {

      listInput.current.value = `${value.charAt(0).toUpperCase()}${value.slice(1)}`
      setFilteredOptions([])
      setSearchTerm("")
    }
  }
  
  const handleKeyDown = useCallback(selectItemWithKeyboard, [selectedItemIndex, filteredOptions])

  function selectItemWithKeyboard (e: React.KeyboardEvent) {
    const { key } = e
    const keyActions = ["ArrowUp", "ArrowDown", "Enter"]
    if (key === keyActions[0]) {
      return selectedItemIndex <= 0 ? null
        : setSelectedItemIndex(selectedItemIndex - 1) 
    }
  
    if (key === keyActions[1]) {
      return selectedItemIndex === filteredOptions.length - 1
        ? null
        : setSelectedItemIndex(selectedItemIndex + 1)
    }
  
    if (key === keyActions[2]) {
      setSelectedItemIndex(0)
      changeInputValueAndClear(filteredOptions[selectedItemIndex])
    }

    if(!["ArrowUp", "ArrowDown", "Enter", "ArrowLeft", "ArrowRight"].includes(key)) {
      setFilteredOptions([]) 
    }
  }
  
  return (
    <div className={styles.searchBox} >
      <input 
        type="text"
        name="search-me"
        className={`${handleInputResultsStyling() && styles.hasResults}`}
        placeholder={placeholder}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        ref={listInput}
      />
      <AutoCompleteList 
        searchTerm={searchTerm} 
        filteredList={filteredOptions}
        onClick={handleClick}
        selectedItemIndex={selectedItemIndex}
      />
    </div>
    
  )
}
