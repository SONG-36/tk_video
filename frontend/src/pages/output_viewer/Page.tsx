import { RoutePlaceholder } from '../RoutePlaceholder'
import { pageByKey } from '../pageMeta'

export default function OutputViewerPage() {
  return <RoutePlaceholder page={pageByKey.output_viewer} />
}
