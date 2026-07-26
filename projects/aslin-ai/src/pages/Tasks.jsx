import PageHeader from '../components/common/PageHeader'
import { pageContent } from '../data/mockData'

export default function Tasks() {
  return <PageHeader {...pageContent.tasks} />
}
