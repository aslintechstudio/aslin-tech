import PageHeader from '../components/common/PageHeader'
import { pageContent } from '../data/mockData'

export default function Notes() {
  return <PageHeader {...pageContent.notes} />
}
