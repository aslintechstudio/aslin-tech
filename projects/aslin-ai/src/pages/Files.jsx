import PageHeader from '../components/common/PageHeader'
import { pageContent } from '../data/mockData'

export default function Files() {
  return <PageHeader {...pageContent.files} />
}
