import { RoutePlaceholder } from '../RoutePlaceholder'
import { pageByKey } from '../pageMeta'

export default function ProductListPage() {
  return <RoutePlaceholder page={pageByKey.product_list} />
}
