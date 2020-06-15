#include "information.h"
#include "ui_information.h"
#include <QtDebug>
#include <QSlider>

Information::Information(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::Information)
{
    ui->setupUi(this);

    QObject::connect(ui->View, SIGNAL(clicked()),this, SLOT(clickedSlot()));
    QObject::connect(ui->next, SIGNAL(clicked()),this, SLOT(next()));
}

Information::~Information()
{
    delete ui;
}

void Information::clickedSlot() {

    int h = ((ui->h1->value() * 12) + (ui->h2->value())) * 2.54;
    double w = ui->weight->text().toInt() / 2.2;
    bool g;
    if (ui->comboBox->currentText().compare("M") == 0) {
        g = true;
    }
    else {
        g = false;
    }
    int c = calculateCalories(g, h, ui->age->text().toInt(), w);
    calories = c;
    ui->calories->setText(QString::number(calories));
}

//Miflin St. Jeor Equation
int Information::calculateCalories(bool gender, int height, int age, double weight) {
    int c;
    if (gender) {
        c = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    }
    else {
        c = (10 * weight) + (6.25 * height) - (5 * age) - 101;
    }

    qDebug() << height << age << weight << c;
    return (c);
}

void Information::getFood() {
    QNetworkRequest request(QUrl("http://35.239.86.72:4000/warehouse"));
    //request.setHeader(QNetworkRequest::ContentTypeHeader, "application/json");

    QNetworkAccessManager nam;
    QNetworkReply *reply = nam.get(request);

    while (!reply->isFinished())
    {
        qApp->processEvents();
    }

    QByteArray response_data = reply->readAll();
    qDebug() << " hell" << response_data;
    QJsonDocument json = QJsonDocument::fromJson(response_data);

    displayFood(json);
}

void Information::displayFood(QJsonDocument json) {
    QJsonArray a = json.array();
    qDebug() << a;
    for (int i = 0; i < a.size(); i++) {
        QJsonValue v = a.at(i);
        QJsonObject o = v.toObject();
        qDebug() << o;
        int ca = (o.value("calories").toInt() / o.value("quantitiy").toInt());
        QPushButton* shelterButton = new QPushButton(o.value("name").toString().append("calories: ").append(QString::number(ca)));
        shelterButton->setMaximumHeight(200);
        shelterButton->setSizePolicy(QSizePolicy::Preferred, QSizePolicy::Fixed);
        QObject::connect(shelterButton, SIGNAL(clicked()),this, SLOT(foodSelected()));
        QSlider* slider = new QSlider(Qt::Orientation::Horizontal);
        QObject::connect(slider, SIGNAL(valueChanged()),this, SLOT(sliderChanged()));

        ui->verticalLayout->addWidget(shelterButton);
        ui->verticalLayout->addWidget(slider);
    }
}


void Information::next() {
    if (calories > 354) {
        ui->stackedWidget->setCurrentIndex(1);

        getFood();
    }
}

void Information::foodSelected() {
    QPushButton* buttonSender = qobject_cast<QPushButton*>(sender()); // retrieve the button you have clicked
    QString buttonText = buttonSender->text();

    QStringList l = buttonText.split(QRegExp("\s+"));
    selectedButton = l.takeAt(2).toInt();
}

void Information::sliderChanged(int value) {
    qDebug() << value;
    currCalories += value / 10;
    ui->progressBar->setValue(currCalories / calories * 100);
}
