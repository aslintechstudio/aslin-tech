import PageHeader from '../components/common/PageHeader'
import { pageContent } from '../data/mockData'

export default function Settings() {
  return <PageHeader {...pageContent.settings} />
}
