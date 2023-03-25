import { useCallback, useRef, useEffect } from "react"
import styles from "./AutoCompleteList.module.scss"

interface AutoCompleteListProps {
  searchTerm: string
  filteredList: string[]
  selectedItemIndex: number
  onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void
}

export function AutoCompleteList ({ searchTerm, filteredList, selectedItemIndex, onClick } : AutoCompleteListProps) {

  const listRef = useRef<HTMLUListElement>(null)
  const scrollToActive = useCallback(() => {
    if(listRef?.current) {
      const activeItem = listRef.current.querySelector(`.${styles.active}`)
      if (activeItem) {
        activeItem.scrollIntoView()
      }
    }
  }, [listRef])

  useEffect(() => {
    // get the active item and scroll to it
    scrollToActive()
  }, [selectedItemIndex])

  const highlightMatchedText = useCallback( (text: string) => {
    if (!searchTerm) {
      return text
    }
    const regex = new RegExp(`(${searchTerm})`, "gi")
    return text.split(regex).map((part:string, index: number) => (
      <span 
        key={index} 
        className={part.toLowerCase() === searchTerm.toLowerCase() ? styles.highlight : ""}
        data-name={text}
      >
        {part}
      </span>
    ))
  }, [searchTerm])

  if(filteredList?.length > 0) {
    return (
      <ul className={styles.autoCompleteList} ref={listRef}>
        {filteredList.map((listItem,index) => {
          return (
            <li
              className={`${selectedItemIndex === index && styles.active}`}
              key={`${listItem}-${index}`}
              onClick={onClick}
              data-name={listItem}
            >
              {highlightMatchedText(listItem)}
            </li>
          )
        })
        }
      </ul>
    )
  } else {
    if (searchTerm?.length > 0) {
      return (
        <div className={styles.emptyResults}>
          No results found for: <span>{searchTerm}</span>
        </div>
      )
    } else {
      return <></>
    }
  }
  
}