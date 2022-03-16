// ** Icons Import
import { Mail, MessageSquare, CheckSquare, Calendar, FileText, Circle, ShoppingCart, User, Shield } from 'react-feather'

export default [
  {
    header: 'Apps & Pages'
  },
  {
    id: 'music',
    title: 'Music',
    icon: <Mail size={20} />,
    navLink: '/apps/music/list'
  },
  {
    id: 'chat',
    title: 'Videos',
    icon: <MessageSquare size={20} />,
    navLink: ''
  },
  {
    id: 'invoiceApp',
    title: 'Royalties',
    icon: <FileText size={20} />,
    children: [
      {
        id: 'invoiceList',
        title: 'Sales',
        icon: <Circle size={12} />,
        navLink: ''
      },
      {
        id: 'invoicePreview',
        title: 'Payouts',
        icon: <Circle size={12} />,
        navLink: ''
      }
    ]
  },
  {
    id: 'analyticsDash',
    title: 'Analytics',
    icon: <Circle size={12} />,
    navLink: ''
  }
]
