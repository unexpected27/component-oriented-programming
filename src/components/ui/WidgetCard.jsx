import Card from './atoms/Card/Card';

function WidgetCard({ title, description, headerActions, children, className = '' }) {
  return (
    <Card
      title={title}
      description={description}
      headerActions={headerActions}
      className={className}
    >
      {children}
    </Card>
  );
}

export default WidgetCard;
